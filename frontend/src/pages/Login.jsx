import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./styles/Login.css";


const Login = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  const handleLogIn = () =>{
    navigate('/home');
  }


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log in</h2>
        <form>
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button" onClick={handleLogIn}>Log in</button>
        </form>

        <div className="login-divider">or</div>

        <button onClick={handleGoogleSignIn} className="google-button">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="google-logo"
          />
          Sign in with Google
        </button>

        <div className="login-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
