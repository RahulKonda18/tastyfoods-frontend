import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import img from "../Images/Large-Login.jpeg";
import logo from "../Images/logo.png";
import small from "../Images/SmallLogin.png";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const successLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
  };

  const navigateToRegister = () => navigate("/register");

  const failedLogin = (errorMsg) => setMsg(errorMsg);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const apiLoginUrl = "https://tastyfoods-apis.onrender.com/login";
    const userDetails = { username: username, password: password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiLoginUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      successLogin(data.jwt_token);
    } else {
      failedLogin(data.error_msg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) return <Navigate to="/" />;

  return (
    <div className="login-background">
      <div className="left-part">
        <div className="rig">
          <img src={small} alt="website logo" />
        </div>
        <form className="login-card" onSubmit={onSubmitForm}>
          <img src={logo} alt="website logo" className="login-logo" />
          <h1 className="logo-name">Tasty Kitchens</h1>
          <h1 className="login-text">Login</h1>
          <div className="left-align">
            <label htmlFor="username" className="labels">
              USERNAME
            </label>
            <input
              type="text"
              onChange={onChangeUsername}
              className="input"
              id="username"
              value={username}
            />
          </div>
          <div className="left-align">
            <label className="labels" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              className="input"
              id="password"
              value={password}
            />
          </div>
          <div className="error">
            <p className="error-msg">{msg}</p>
          </div>
          <div className="buttons">
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              onClick={navigateToRegister}
              type="button"
              className="login-button2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <img src={img} alt="website login" className="image-login" />
    </div>
  );
};

export default Login;
