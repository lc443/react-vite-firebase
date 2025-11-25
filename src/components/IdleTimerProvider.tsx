import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../state/auth/auth.slice";
import { startIdleTimer, stopIdleTimer } from "../utils/idleTimer";
import IdleWarningModal from "./IdleWarningModal";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export default function IdleTimerProvider({ children }: { children: any }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [warningOpen, setWarningOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    let countdownInterval: number | null = null;

    function handleWarning() {
      setWarningOpen(true);
      setSecondsLeft(60);

      countdownInterval = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval!);
          }
          return prev - 1;
        });
      }, 1000);
    }

    async function handleLogout() {
      setWarningOpen(false);
      if (countdownInterval) clearInterval(countdownInterval);

      await auth.signOut();
      dispatch(logout());
      localStorage.removeItem("authUser");
      navigate("/login");
    }

    startIdleTimer(handleWarning, handleLogout);

    return () => {
      stopIdleTimer();
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, []);

  function stayLoggedIn() {
    setWarningOpen(false);
    setSecondsLeft(60);
  }

  return (
    <>
      <IdleWarningModal
        open={warningOpen}
        secondsLeft={secondsLeft}
        onStay={stayLoggedIn}
      />
      {children}
    </>
  );
}