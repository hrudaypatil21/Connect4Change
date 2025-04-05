import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login_Individual.css";

const LoginIndividual = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
        <div className="login-container">
  <form className="login-form" onSubmit={handleSubmit}>
    <h2 className="login-title">Login as Individual</h2>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Login</button>
    <div className="login-link">
      Don’t have an account? <a href="/individual-registration">Register</a>
    </div>
  </form>
</div>
  );
};

export default LoginIndividual;
