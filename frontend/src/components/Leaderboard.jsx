import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [user, setUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('all'); // all, weekly, monthly
  const [sortBy, setSortBy] = useState('winnings'); // winnings, rank, lastBet
  const [showDropdown, setShowDropdown] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState('global');

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
    // Simulated API call with different data for different timeframes
    const mockDataByTimeFrame = {
      all: [
        { id: 1, rank: 1, name: 'Michael Jordan', winnings: 150000, lastBet: 'Lakers vs Warriors - Spread' },
        { id: 2, rank: 2, name: 'Tom Brady', winnings: 125000, lastBet: 'Chiefs vs Bills - Moneyline' },
        { id: 3, rank: 3, name: 'LeBron James', winnings: 98000, lastBet: 'Celtics vs Nets - Over/Under' },
        { id: 4, rank: 4, name: 'Patrick Mahomes', winnings: 85000, lastBet: 'Eagles vs Cowboys - Spread' },
        { id: 5, rank: 5, name: 'Stephen Curry', winnings: 72000, lastBet: 'Warriors vs Suns - Player Props' }
      ],
      weekly: [
        { id: 1, rank: 1, name: 'Kevin Durant', winnings: 25000, lastBet: 'Nets vs 76ers - First Quarter' },
        { id: 2, rank: 2, name: 'Josh Allen', winnings: 18500, lastBet: 'Bills vs Jets - Total Points' },
        { id: 3, rank: 3, name: 'Ja Morant', winnings: 15000, lastBet: 'Grizzlies vs Pelicans - Spread' },
        { id: 4, rank: 4, name: 'Justin Herbert', winnings: 12000, lastBet: 'Chargers vs Raiders - Moneyline' },
        { id: 5, rank: 5, name: 'Luka Doncic', winnings: 10000, lastBet: 'Mavericks vs Clippers - Player Props' }
      ],
      monthly: [
        { id: 1, rank: 1, name: 'Giannis A.', winnings: 75000, lastBet: 'Bucks vs Heat - Double Result' },
        { id: 2, rank: 2, name: 'Aaron Rodgers', winnings: 62000, lastBet: 'Jets vs Patriots - First TD' },
        { id: 3, rank: 3, name: 'Nikola Jokic', winnings: 55000, lastBet: 'Nuggets vs Lakers - Spread' },
        { id: 4, rank: 4, name: 'Lamar Jackson', winnings: 48000, lastBet: 'Ravens vs Bengals - Over/Under' },
        { id: 5, rank: 5, name: 'Devin Booker', winnings: 42000, lastBet: 'Suns vs Kings - First Half' }
      ]
    };

    // Simulate API delay
    setTimeout(() => {
      setLeaderboardData(mockDataByTimeFrame[timeFrame]);
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
                  <td>
                    <Link 
                      to={`/portfolio/${user.id}`} 
                      className="player-link"
                      onClick={(e) => {
                        // Store the user data in localStorage for the portfolio
                        localStorage.setItem('viewedUser', JSON.stringify({
                          id: user.id,
                          name: user.name,
                          totalBets: Math.floor(Math.random() * 200) + 50,
                          winRate: Math.random() * 100
                        }));
                      }}
                    >
                      {user.name}
                    </Link>
                  </td>
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