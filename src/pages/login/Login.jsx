import React, { useEffect, useState } from "react";
import { setAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { isAuth } from "./../../utils/auth";
import "./Login.css"

const Login = () => {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username !== password || !username || !password) {
      alert("Please enter valid credentials");
      return;
    }
    setAuth(true);
    alert("Login Successful");
    navigate("/orders");
    return;
  };

  useEffect(() => {
    isAuth() && navigate("orders");
  });

  return (
    <main className="page-container">
      <form className="login-form">
        <h1>Sign In</h1>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button className="Button" id="login-btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
