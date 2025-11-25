import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { store } from "../state/store";
import { loginSuccess, logout } from "../state/auth/auth.slice";
import { getUserProfile } from "../services/userService";

export function startAuthListener() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      store.dispatch(logout());
      return;
    }

    const profile = await getUserProfile(user.uid);

    store.dispatch(
      loginSuccess({
        uid: user.uid,
        email: user.email,
        ...profile,
      })
    );
  });
}
