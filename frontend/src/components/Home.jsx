import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sample upcoming matches data
  const sampleUpcomingMatches = [
    {
      id: 1,
      league: 'NBA',
      team1: 'Los Angeles Lakers',
      team2: 'Golden State Warriors',
      date: '2024-03-25',
      time: '7:30 PM EST',
      odds: { team1: 1.85, team2: 2.05 },
      venue: 'Crypto.com Arena'
    },
    {
      id: 2,
      league: 'NBA',
      team1: 'Boston Celtics',
      team2: 'Milwaukee Bucks',
      date: '2024-03-26',
      time: '8:00 PM EST',
      odds: { team1: 1.95, team2: 1.95 },
      venue: 'TD Garden'
    },
    {
      id: 3,
      league: 'NFL',
      team1: 'Kansas City Chiefs',
      team2: 'San Francisco 49ers',
      date: '2024-03-27',
      time: '4:25 PM EST',
      odds: { team1: 2.10, team2: 1.80 },
      venue: 'Arrowhead Stadium'
    },
    {
      id: 4,
      league: 'NFL',
      team1: 'Dallas Cowboys',
      team2: 'Philadelphia Eagles',
      date: '2024-03-28',
      time: '8:20 PM EST',
      odds: { team1: 1.90, team2: 2.00 },
      venue: 'AT&T Stadium'
    }
  ];

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
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
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        setShowLoginForm(false);
        setFormData({ email: '', password: '', firstName: '', lastName: '' });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email already exists
      if (users.some(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set as current user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      setShowRegisterForm(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '' });
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
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
        <nav className="nav">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
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
          <h1>Welcome to Sports Betting</h1>
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
          <section className="upcoming-matches">
            <h2>Upcoming Matches</h2>
            <div className="matches-grid">
              {sampleUpcomingMatches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-league">{match.league}</div>
                  <div className="match-teams">
                    <div className="team">
                      <div className="team-name">{match.team1}</div>
                      <div className="odds">Odds: {match.odds.team1}</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <div className="team-name">{match.team2}</div>
                      <div className="odds">Odds: {match.odds.team2}</div>
                    </div>
                  </div>
                  <div className="match-info">
                    <div className="match-venue">{match.venue}</div>
                    <div className="match-datetime">
                      <div className="date">{match.date}</div>
                      <div className="time">{match.time}</div>
                    </div>
                  </div>
                  <Link to="/place-bet" className="bet-now-btn">
                    Place Bet
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Sports Betting. All rights reserved.</p>
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