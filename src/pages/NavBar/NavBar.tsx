import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { logout } from "../../state/auth/auth.slice";
import "./Navbar.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">
        MyReactApp
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav ms-auto">
          {auth.isAuthenticated ? (
            <>
              <li className="nav-item d-flex align-items-center me-3 text-white fw-bold">
                Welcome, {auth.user?.firstName || auth.user?.email}! 
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}