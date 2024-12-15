import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../Images/Large-Login.jpeg";
import logo from "../Images/logo.png";
import Switch from "react-switch";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleChange = () => setChecked(!checked);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const successLogin = () => {
    navigate("/");
  };

  const navigateToLogin = () => navigate("/login");

  const failedLogin = (errorMsg) => setMsg(errorMsg);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const apiLoginUrl = "https://tastyfoods-apis.onrender.com/register";
    const userDetails = { username: username, password: password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiLoginUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      successLogin();
    } else {
      failedLogin(data.error_msg);
    }
  };

  return (
    <div className="login-background">
      <div className="left-part">
        <form className="login-card" onSubmit={onSubmitForm}>
          <img src={logo} alt="website logo" className="login-logo" />
          <h1 className="logo-name">Tasty Kitchens</h1>
          <h1 className="login-text">Register</h1>
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
              type={checked ? "text" : "password"}
              onChange={onChangePassword}
              className="input"
              id="password"
              value={password}
            />
          </div>
          <div className="left-aligns">
            <label className="labels" htmlFor="show">
              SHOW PASSWORD
            </label>
            <Switch
              onColor={"#f7931e"}
              onChange={handleChange}
              checked={checked}
            />
          </div>
          <div className="error">
            <p className="error-msg">{msg}</p>
          </div>

          <div className="buttons">
            <button type="submit" className="login-button">
              Register
            </button>
            <button
              type="button"
              onClick={navigateToLogin}
              className="login-button2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <img src={img} alt="website login" className="image-login" />
    </div>
  );
};

export default Register;
