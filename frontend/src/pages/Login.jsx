import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../Styles/loginStyles.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;

      if (isLogin) {
        data = await login(formData.email, formData.password);
      } else {
        data = await register(formData.name, formData.email, formData.password);
      }

      // ✅ ROLE BASED REDIRECT
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          {/* HEADER */}
          <div className="login-header">
            <Link to="/" className="brand-link">
              <span className="brand-icon">🛒</span>
              GroceryMart
            </Link>
            <h1>{isLogin ? "Welcome Back!" : "Create Account"}</h1>
            <p>{isLogin ? "Sign in to continue" : "Join us today"}</p>
          </div>

          {/* FORM */}
          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* TOGGLE */}
            <div className="form-footer">
              <p>
                {isLogin ? "New user?" : "Already have an account?"}{" "}
                <button onClick={toggleMode} className="toggle-btn">
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

            {/* DEMO INFO */}
            <div className="demo-credentials">
              <h4>Demo Credentials</h4>
              <p>
                <strong>User:</strong> demo@grocerymart.com / demo123
              </p>
              <p>
                <strong>Admin:</strong> admin@grocerymart.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 2rem 0;
        }

        .login-container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          max-width: 450px;
          width: 100%;
          margin: 0 auto;
        }

        .login-header {
          background: #2c3e50;
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .brand-link {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .brand-icon {
          font-size: 1.8rem;
          margin-right: 0.5rem;
        }

        .login-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .login-form-container {
          padding: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          padding: 12px 15px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #2c3e50;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.9rem;
          text-align: center;
        }

        .btn-primary {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
          background: #34495e;
        }

        .btn-primary:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }

        .form-footer {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e1e5e9;
        }

        .form-footer p {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: #2c3e50;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .toggle-btn:hover {
          color: #34495e;
        }

        .demo-credentials {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 2rem;
          text-align: center;
        }

        .demo-credentials h4 {
          margin-bottom: 1rem;
          color: #333;
        }

        .demo-credentials p {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }

        @media (max-width: 480px) {
          .login-container {
            margin: 1rem;
            max-width: none;
          }

          .login-header {
            padding: 1.5rem;
          }

          .login-form-container {
            padding: 1.5rem;
          }

          .login-header h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
