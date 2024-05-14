import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <div>
      <header>
        <Link to="/">
          <div>
            <img
              src="https://t4.ftcdn.net/jpg/04/51/74/43/360_F_451744391_932DU0eXgGbpDZhcemuTjz1jTlqiCuIF.jpg"
              alt="logo"
            />
          </div>
        </Link>
        <nav>
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/about">
            <div>Contact</div>
          </Link>
          {user ? (
            <div>
              <div>{user?.name}</div> {/* Display user name */}
              <div onClick={handleLogout}>Logout</div> {/* Logout button */}
            </div>
          ) : (
            <Link to="/login">
              <div>Login</div>
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
