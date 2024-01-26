import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import UserContext from "../context/userContext";

const LoginForm = () => {
  const User = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(User);
  useEffect(() => {
    if (User.currentUser) navigate("/mainpage");
  }, []);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, password);
    axios
      .post(`http://localhost:5000/login`, {
        username: userName,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          User.setCurrentUser(token);
          if (User.currentUser != "") navigate(`/mainpage`);
        } else {
          console.log("Access Denied");
        }
      })
      .catch((error) => console.log(error));

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <form action="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="username-container">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            name="username"
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="password-container">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
