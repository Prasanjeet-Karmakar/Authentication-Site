import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import "./MainPage.css";

const MainPage = () => {
  const User = useContext(UserContext);
  console.log(User.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!User.currentUser) navigate("/login");
    axios
      .post(`http://localhost:5000/MainPage`, { username: User.currentUser })
      .then((response) => console.log(response?.data?.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-page-container">
      <h2>{User.currentUser}</h2>
    </div>
  );
};

export default MainPage;
