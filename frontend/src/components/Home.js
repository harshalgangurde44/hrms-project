// Home.js
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ContainPage from "./ContainPage";

const Home = ({ user }) => {
  return (
    <div>
      <main className="main-container">
        <Link to="/attendance" className="link">
          <div>Daily Attendance</div>
        </Link>
        <Link to="/new" className="link">
          <div> Add New Employees</div>
        </Link>
        <Link to="/adminpage" className="link">
          <div>Hr-Page</div>
        </Link>
        <div className="userName">{user?.other?.name}</div>
      </main>
      <div className="contain">
        <ContainPage />
      </div>
    </div>
  );
};

export default Home;
