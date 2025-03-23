import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/teams" className="nav-link">Teams</Link>
        <Link to="/place-bet" className="nav-link">Place Bet</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
      </div>
      {user && (
        <div className="user-menu">
          <div className="user-info" onClick={toggleDropdown}>
            <span>{user.firstName} {user.lastName}</span>
            <i className="fas fa-chevron-down"></i>
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/portfolio" className="dropdown-item">Portfolio</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <button
                className="dropdown-item"
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 