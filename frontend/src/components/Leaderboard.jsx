import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/betiq-logo.svg';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [user, setUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('all'); // all, weekly, monthly
  const [sortBy, setSortBy] = useState('winnings'); // winnings, rank, lastBet
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    fetchLeaderboardData();
  }, [timeFrame]);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      setUser(currentUser);
    } else {
      window.location.href = '/';
    }
    setIsLoading(false);
  };

  const fetchLeaderboardData = () => {
    // Simulated API call - in a real app, this would fetch from your backend
    const mockData = [
      { id: 1, rank: 1, name: 'John Doe', winnings: 500, lastBet: 'Game 1 - Moneyline' },
      { id: 2, rank: 2, name: 'Jane Smith', winnings: 450, lastBet: 'Game 2 - Spread' },
      { id: 3, rank: 3, name: 'Bob Lee', winnings: 400, lastBet: 'Game 3 - Over/Under' },
      { id: 4, rank: 4, name: 'Alice Johnson', winnings: 350, lastBet: 'Game 4 - Parlay' },
      { id: 5, rank: 5, name: 'Charlie Brown', winnings: 300, lastBet: 'Game 5 - Prop Bet' },
    ];

    // Simulate API delay
    setTimeout(() => {
      setLeaderboardData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
    setIsLoading(true);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const sortedData = [...leaderboardData].sort((a, b) => {
      switch (e.target.value) {
        case 'winnings':
          return b.winnings - a.winnings;
        case 'rank':
          return a.rank - b.rank;
        case 'lastBet':
          return a.lastBet.localeCompare(b.lastBet);
        default:
          return 0;
      }
    });
    setLeaderboardData(sortedData);
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
    <div className="leaderboard-container">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/place-bet" className="nav-link">Place Bet</Link>
          <Link to="/cash-out" className="nav-link">Cash Out</Link>
        </nav>
        {user && (
          <div className="user-info">
            <div className="user-name" onClick={toggleDropdown}>
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <i className="fa fa-caret-down"></i>
            </div>
            <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
              <Link to="/">Home</Link>
              <a href="#profile">My Profile</a>
              <a href="#settings">Settings</a>
              <a href="#" onClick={() => {
                localStorage.removeItem('currentUser');
                window.location.href = '/';
              }}>Logout</a>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        <h1>Leaderboard</h1>

        <div className="leaderboard-controls">
          <div className="time-frame-selector">
            <label htmlFor="timeFrame">Time Frame:</label>
            <select 
              id="timeFrame" 
              value={timeFrame} 
              onChange={handleTimeFrameChange}
            >
              <option value="all">All Time</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
            </select>
          </div>

          <div className="sort-selector">
            <label htmlFor="sortBy">Sort By:</label>
            <select 
              id="sortBy" 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="winnings">Winnings</option>
              <option value="rank">Rank</option>
              <option value="lastBet">Last Bet</option>
            </select>
          </div>
        </div>

        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Winnings</th>
                <th>Last Bet</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.id} className={user.id === 1 ? 'top-player' : ''}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>${user.winnings.toLocaleString()}</td>
                  <td>{user.lastBet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 BetIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Leaderboard; 