import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/auth/auth.thunk";
import type { RootState } from "../../state/store";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // dispatch thunk
    await dispatch<any>(login(email, password));

    // redirect after successful login
    if (!loading && !error) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Please wait…" : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/register">Create Account</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}