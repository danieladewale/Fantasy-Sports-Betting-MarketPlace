import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/fantasysportsbettinglogo.svg';
import '../styles/PlaceBet.css';

const PlaceBet = () => {
  const [user, setUser] = useState(null);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - in a real app, this would come from an API
  const matches = {
    nba: [
      { id: 1, team1: 'Lakers', team2: 'Warriors', odds: { team1: 1.85, team2: 2.05 } },
      { id: 2, team1: 'Celtics', team2: 'Nets', odds: { team1: 1.95, team2: 1.95 } },
    ],
    nfl: [
      { id: 3, team1: 'Patriots', team2: 'Bills', odds: { team1: 2.10, team2: 1.80 } },
      { id: 4, team1: 'Cowboys', team2: 'Eagles', odds: { team1: 1.90, team2: 2.00 } },
    ]
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      setUser(currentUser);
    } else {
      window.location.href = '/';
    }
    setIsLoading(false);
  };

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
    setSelectedMatch('');
    setSelectedTeam('');
  };

  const handleMatchChange = (e) => {
    setSelectedMatch(e.target.value);
    setSelectedTeam('');
  };

  const handlePlaceBet = (e) => {
    e.preventDefault();
    if (!selectedSport || !selectedMatch || !selectedTeam || !betAmount) {
      alert('Please fill in all fields');
      return;
    }

    const betData = {
      sport: selectedSport,
      match: selectedMatch,
      team: selectedTeam,
      amount: parseFloat(betAmount),
      timestamp: new Date().toISOString(),
      userId: user.email
    };

    // Here you would typically make an API call to your backend
    console.log('Placing bet:', betData);
    alert('Bet placed successfully!');
    
    // Reset form
    setSelectedSport('');
    setSelectedMatch('');
    setSelectedTeam('');
    setBetAmount('');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="place-bet-container">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/place-bet" className="nav-link active">Place Your Bet</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/portfolios" className="nav-link">Portfolios</Link>
          <Link to="/cash-out" className="nav-link">Cash Out</Link>
        </nav>

        {user && (
          <div className="user-info">
            <div className="user-name">
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
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
        <h1>Place Your Bet</h1>

        <form className="bet-form" onSubmit={handlePlaceBet}>
          <h2>Select Sport</h2>
          <select 
            value={selectedSport} 
            onChange={handleSportChange}
            required
          >
            <option value="">Choose a sport</option>
            <option value="nba">NBA</option>
            <option value="nfl">NFL</option>
          </select>

          {selectedSport && (
            <>
              <h2>Select Match</h2>
              <select 
                value={selectedMatch} 
                onChange={handleMatchChange}
                required
              >
                <option value="">Choose a match</option>
                {matches[selectedSport].map(match => (
                  <option key={match.id} value={match.id}>
                    {match.team1} vs {match.team2}
                  </option>
                ))}
              </select>

              {selectedMatch && (
                <div className="bet-details">
                  <h2>Match Details</h2>
                  <div className="match-info">
                    <div className="team">
                      <div className="team-name">{matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).team1}</div>
                      <div className="odds-value">Odds: {matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).odds.team1}</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <div className="team-name">{matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).team2}</div>
                      <div className="odds-value">Odds: {matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).odds.team2}</div>
                    </div>
                  </div>

                  <h2>Select Team</h2>
                  <div className="odds">
                    <div 
                      className={`odds-item ${selectedTeam === 'team1' ? 'selected' : ''}`}
                      onClick={() => setSelectedTeam('team1')}
                    >
                      {matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).team1}
                    </div>
                    <div 
                      className={`odds-item ${selectedTeam === 'team2' ? 'selected' : ''}`}
                      onClick={() => setSelectedTeam('team2')}
                    >
                      {matches[selectedSport].find(m => m.id === parseInt(selectedMatch)).team2}
                    </div>
                  </div>

                  <h2>Enter Bet Amount</h2>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />

                  <button type="submit">Place Bet</button>
                </div>
              )}
            </>
          )}
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Fantasy Sports Betting. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PlaceBet;
