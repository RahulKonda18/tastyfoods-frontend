import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import img from "../Images/Large-Login.jpeg";
import Switch from "react-switch";
import logo from "../Images/logo.png";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // New state for loader
  const [showInfo, setShowInfo] = useState(true); // State to show/hide the message
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically hide the message after 10 seconds
    const timer = setTimeout(() => setShowInfo(false), 30000);
    return () => clearTimeout(timer);
  }, []);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const successLogin = async (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });

    // Fetch visitor count after successful login
    try {
      const apiUrl = `http://tastyfoods-apis.onrender.com/increment-counter`; // Replace with your API
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Visitor Count:", data.visitors_count); // Log visitor count or handle it as needed
    } catch (error) {
      console.error("Failed to fetch visitor count:", error);
    }

    navigate("/");
  };

  const navigateToRegister = () => navigate("/register");

  const failedLogin = (errorMsg) => setMsg(errorMsg);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loader
    const apiLoginUrl = "https://tastyfoods-apis.onrender.com/login";
    const userDetails = { username: username, password: password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiLoginUrl, options);
    const data = await response.json();
    setLoading(false); // Stop loader
    if (response.ok === true) {
      successLogin(data.jwt_token);
    } else {
      failedLogin(data.error_msg);
    }
  };

  const handleChange = () => setChecked(!checked);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) return <Navigate to="/" />;

  return (
    <div className="login-background">
      {showInfo && (
        <div className="info-banner">
          <p>
            The backend is deployed on Render, a free service. It may take
            around 60 seconds to spin up. Please wait patiently.
          </p>
        </div>
      )}
      <div className="left-part">
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
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span className="spinner"></span> // Loader inside button
              ) : (
                "Login"
              )}
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
