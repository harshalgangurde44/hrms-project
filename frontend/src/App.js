// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import NewCandidate from "./components/NewCandidate";
import DailyAttendance from "./components/DailyAttendance";
import HrPage from "./components/HrPage";

function App() {
  const [user, SetUser] = useState(null);
  console.log(user);
  const handleLogin = (info) => {
    localStorage.setItem("user", JSON.stringify(info)); // Store user data in local storage
    SetUser(info);
  };
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from local storage
    SetUser(null);
  };

  return (
    <Router>
      <div>
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<NewCandidate user={user} />} />
          <Route path="/attendance" element={<DailyAttendance />} />
          <Route path="/adminpage" element={<HrPage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
