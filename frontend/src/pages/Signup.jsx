import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './styles/Signup.css'; 




const Signup = () => {

  const navigate = useNavigate();
  const handleSignup = () =>{
    navigate ('/Home');
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign up</h2>

        <input type="email" placeholder="Email address" className="signup-input" />
        <input type="password" placeholder="Password" className="signup-input" />
        <input type="password" placeholder="Confirm password" className="signup-input" />
        <input type="text" placeholder="Role (Student/ Instructor)" className="signup-input" />

        <button className="signup-button" onClick={handleSignup}>Sign up</button>

        <p className="signup-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
