import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import nbaLogo from '../assets/images/teams/nba-logo.svg';
import nflLogo from '../assets/images/teams/nfl-logo.svg';
import TeamLogo from './TeamLogo';
import '../styles/Teams.css';

const Teams = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('NBA');
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // NBA teams data with divisions
  const nbaTeams = {
    "Atlantic": [
      "Boston Celtics",
      "Brooklyn Nets",
      "New York Knicks",
      "Philadelphia 76ers",
      "Toronto Raptors"
    ],
    "Central": [
      "Chicago Bulls",
      "Cleveland Cavaliers",
      "Detroit Pistons",
      "Indiana Pacers",
      "Milwaukee Bucks"
    ],
    "Southeast": [
      "Atlanta Hawks",
      "Charlotte Hornets",
      "Miami Heat",
      "Orlando Magic",
      "Washington Wizards"
    ],
    "Northwest": [
      "Denver Nuggets",
      "Minnesota Timberwolves",
      "Oklahoma City Thunder",
      "Portland Trail Blazers",
      "Utah Jazz"
    ],
    "Pacific": [
      "Golden State Warriors",
      "LA Clippers",
      "Los Angeles Lakers",
      "Phoenix Suns",
      "Sacramento Kings"
    ],
    "Southwest": [
      "Dallas Mavericks",
      "Houston Rockets",
      "Memphis Grizzlies",
      "New Orleans Pelicans",
      "San Antonio Spurs"
    ]
  };
  
  // NFL teams data with divisions
  const nflTeams = {
    "AFC North": [
      "Baltimore Ravens",
      "Cincinnati Bengals",
      "Cleveland Browns",
      "Pittsburgh Steelers"
    ],
    "AFC South": [
      "Houston Texans",
      "Indianapolis Colts",
      "Jacksonville Jaguars",
      "Tennessee Titans"
    ],
    "AFC East": [
      "Buffalo Bills",
      "Miami Dolphins",
      "New England Patriots",
      "New York Jets"
    ],
    "AFC West": [
      "Denver Broncos",
      "Kansas City Chiefs",
      "Las Vegas Raiders",
      "Los Angeles Chargers"
    ],
    "NFC North": [
      "Chicago Bears",
      "Detroit Lions",
      "Green Bay Packers",
      "Minnesota Vikings"
    ],
    "NFC South": [
      "Atlanta Falcons",
      "Carolina Panthers",
      "New Orleans Saints",
      "Tampa Bay Buccaneers"
    ],
    "NFC East": [
      "Dallas Cowboys",
      "New York Giants",
      "Philadelphia Eagles",
      "Washington Commanders"
    ],
    "NFC West": [
      "Arizona Cardinals",
      "Los Angeles Rams",
      "San Francisco 49ers",
      "Seattle Seahawks"
    ]
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
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

  const teams = selectedLeague === 'NBA' ? nbaTeams : nflTeams;

  const handlePlaceBet = (team) => {
    navigate(`/team-portfolio/${encodeURIComponent(team)}/${selectedLeague}`);
  };

  return (
    <div className="teams-container">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/teams" className="nav-link active">Teams</Link>
          <Link to="/place-bet" className="nav-link">Place Bet</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
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
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="league-selector">
          <div 
            className={`league-option ${selectedLeague === 'NBA' ? 'active' : ''}`}
            onClick={() => setSelectedLeague('NBA')}
          >
            <TeamLogo teamName="NBA" league="NBA" />
            <span>NBA</span>
          </div>
          <div 
            className={`league-option ${selectedLeague === 'NFL' ? 'active' : ''}`}
            onClick={() => setSelectedLeague('NFL')}
          >
            <TeamLogo teamName="NFL" league="NFL" />
            <span>NFL</span>
          </div>
        </div>

        <div className="teams-grid">
          {Object.entries(teams).map(([division, teamsList]) => (
            <div key={division} className="division-container">
              <h2 className="division-title">{division}</h2>
              <div className="division-teams">
                {teamsList.map((team) => (
                  <div key={team} className="team-card">
                    <TeamLogo teamName={team} league={selectedLeague} />
                    <h3 className="team-name">{team}</h3>
                    <button 
                      className="bet-button"
                      onClick={() => handlePlaceBet(team)}
                    >
                      Place Bet
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Sports Betting. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Teams; 