import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    console.log(username, email);
    axios
      .post("http://localhost:5000/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="register-container">
      <form action="POST" onSubmit={(e) => handleClick(e)}>
        <div className="username-container">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="email-container">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="password-container">
          <label htmlFor="pass">Password:</label>
          <br />
          <input
            name="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button onClick={(e) => handleClick(e)}>Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
