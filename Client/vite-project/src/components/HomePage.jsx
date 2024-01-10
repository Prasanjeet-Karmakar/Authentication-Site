import { useEffect, useRef, useContext } from "react";
import axios from "axios";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import "./HomePage.css";

const HomePage = () => {
  const User = useContext(UserContext);
  const navigate = useNavigate();

  const el = useRef(null);
  const Strings = [
    "Welcome to the Password Manager.",
    "It is Storehouse of Passwords.",
    "It is Safe and Secure.",
  ];
  useEffect(() => {
    if (User.currentUser != "") {
      navigate("/mainpage");
      return;
    }
    const typed = new Typed(el.current, {
      strings: Strings,
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      loop: Infinity,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="home-container">
      <h1>
        <span ref={el}></span>
      </h1>
    </div>
  );
};

export default HomePage;
