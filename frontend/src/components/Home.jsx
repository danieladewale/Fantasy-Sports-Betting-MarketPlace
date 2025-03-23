import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/betiq-logo.svg';
import { authService, betService } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [upcomingBets, setUpcomingBets] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    if (user) {
      fetchUpcomingBets();
    }
  }, [user]);

  const checkLoginStatus = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  };

  const fetchUpcomingBets = async () => {
    try {
      const bets = await betService.getBets();
      setUpcomingBets(bets);
    } catch (err) {
      setError('Failed to fetch upcoming bets');
      console.error('Error fetching bets:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });
      setUser(response.user);
      setShowLoginForm(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '' });
      fetchUpcomingBets();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      setUser(response.user);
      setShowRegisterForm(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '' });
      fetchUpcomingBets();
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-info')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <nav className="nav">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/place-bet" className="nav-link">Place Bet</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
        </nav>
        {user ? (
          <div className="user-info">
            <div className="user-name" onClick={toggleDropdown}>
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <i className="fa fa-caret-down"></i>
            </div>
            <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
              <Link to="/">Home</Link>
              <a href="#profile">My Profile</a>
              <a href="#settings">Settings</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <a onClick={() => setShowLoginForm(true)}>Login</a>
            <a onClick={() => setShowRegisterForm(true)}>Register</a>
          </div>
        )}
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to BetIQ</h1>
          <p>Your Smart Sports Betting Platform - Place your bets on your favorite teams and compete with other players!</p>
          {!user && (
            <button className="btn" onClick={() => setShowRegisterForm(true)}>
              Get Started
            </button>
          )}
        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {user && (
          <section className="upcoming-bets">
            <h2>Upcoming Matches</h2>
            <div className="match-grid">
              {upcomingBets.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-teams">
                    <div className="team">
                      <div className="team-name">{match.team1}</div>
                      <div className="odds-value">Odds: {match.odds.team1}</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <div className="team-name">{match.team2}</div>
                      <div className="odds-value">Odds: {match.odds.team2}</div>
                    </div>
                  </div>
                  <div className="match-details">
                    <div className="match-date">{match.date}</div>
                    <div className="match-time">{match.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 BetIQ. All rights reserved.</p>
      </footer>

      {/* Login Form */}
      {showLoginForm && (
        <div className="form-screen">
          <div className="form-box">
            <span className="close-btn" onClick={() => setShowLoginForm(false)}>&times;</span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Form */}
      {showRegisterForm && (
        <div className="form-screen">
          <div className="form-box">
            <span className="close-btn" onClick={() => setShowRegisterForm(false)}>&times;</span>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 