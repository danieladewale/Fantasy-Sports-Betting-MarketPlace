import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/fantasysportsbettinglogo.svg';
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

  useEffect(() => {
    checkLoginStatus();
    fetchUpcomingBets();
  }, []);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      setUser(currentUser);
    }
    setIsLoading(false);
  };

  const fetchUpcomingBets = () => {
    // Simulated API call - in a real app, this would fetch from your backend
    const mockBets = [
      {
        id: 1,
        team1: 'Lakers',
        team2: 'Warriors',
        date: '2024-03-20',
        time: '19:00',
        odds: { team1: 1.85, team2: 2.05 }
      },
      {
        id: 2,
        team1: 'Patriots',
        team2: 'Bills',
        date: '2024-03-21',
        time: '20:00',
        odds: { team1: 2.10, team2: 1.80 }
      }
    ];

    setTimeout(() => {
      setUpcomingBets(mockBets);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated login - in a real app, this would call your backend
    const mockUser = {
      email: formData.email,
      firstName: 'John',
      lastName: 'Doe'
    };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setShowLoginForm(false);
    setFormData({ email: '', password: '', firstName: '', lastName: '' });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulated registration - in a real app, this would call your backend
    const mockUser = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName
    };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setShowRegisterForm(false);
    setFormData({ email: '', password: '', firstName: '', lastName: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

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
          <Link to="/cash-out" className="nav-link">Cash Out</Link>
        </nav>
        {user ? (
          <div className="user-info">
            <div className="user-name">
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
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
          <h1>Welcome to Fantasy Sports Betting</h1>
          <p>Place your bets on your favorite teams and compete with other players!</p>
          {!user && (
            <button className="btn" onClick={() => setShowRegisterForm(true)}>
              Get Started
            </button>
          )}
        </section>

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
        <p>&copy; 2025 Fantasy Sports Betting. All rights reserved.</p>
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
