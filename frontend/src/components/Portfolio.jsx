import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Portfolio.css';

// Define the API URL
const API_URL = 'http://localhost:5000';

const Portfolio = () => {
  const [leaderboardType, setLeaderboardType] = useState('global');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [leaderboardType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Log the request
      console.log(`Fetching ${leaderboardType} leaderboard...`);
      
      const response = await axios.get(`${API_URL}/api/leaderboard/${leaderboardType}`);
      
      // Log the response
      console.log('Server response:', response.data);
      
      if (Array.isArray(response.data)) {
        setLeaderboard(response.data);
      } else {
        console.error('Invalid data format:', response.data);
        setError('Received invalid data format from server');
      }
    } catch (err) {
      console.error('Error details:', err);
      
      if (err.response) {
        // Server responded with an error
        setError(`Server error: ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        // No response received
        setError('Could not connect to server. Please check if the server is running.');
      } else {
        // Request setup error
        setError(`Request failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (type) => {
    setLeaderboardType(type);
  };

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div className="portfolio-container">
      <header className="header">
        <div className="logo">
          <h1>BetIQ</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/place-bet" className="nav-link">Place Bet</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/portfolio" className="nav-link active">Portfolio</Link>
        </nav>
        <div className="user-info">
          <span className="user-name">John Doe</span>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <a href="#" onClick={() => console.log('Logout')}>Logout</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="portfolio-header">
          <h2>Portfolio Overview</h2>
          <div className="portfolio-filters">
            <button 
              className={`filter-btn ${leaderboardType === 'global' ? 'active' : ''}`}
              onClick={() => handleTabChange('global')}
            >
              Global Leaderboard
            </button>
            <button 
              className={`filter-btn ${leaderboardType === 'weekly' ? 'active' : ''}`}
              onClick={() => handleTabChange('weekly')}
            >
              Weekly Leaderboard
            </button>
          </div>
        </section>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading leaderboard data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="no-data">
            <p>No leaderboard data available</p>
          </div>
        ) : (
          <div className="leaderboard-table">
            <div className="table-header">
              <div className="header-cell">Rank</div>
              <div className="header-cell">Player</div>
              <div className="header-cell">Points</div>
              <div className="header-cell">Win Rate</div>
            </div>
            {leaderboard.map((player, index) => (
              <div 
                key={player.userId} 
                className={`table-row ${index < 3 ? 'top-three' : ''}`}
              >
                <div className="cell rank-cell">
                  {index < 3 ? (
                    <div className={`medal medal-${index + 1}`}>
                      {index + 1}
                    </div>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="cell">{player.name}</div>
                <div className="cell">{player.points}</div>
                <div className="cell">{player.winRate}%</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 BetIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio; 