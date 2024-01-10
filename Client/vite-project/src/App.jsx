import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import MainPage from "./components/MainPage";
import UserContext from "./context/userContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app-container">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/mainpage" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}
