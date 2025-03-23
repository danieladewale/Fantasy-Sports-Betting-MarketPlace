import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/fantasysportsbettinglogo.svg';
import '../styles/Teams.css';

const Teams = () => {
  const [user, setUser] = useState(null);
  const [selectedNBATeams, setSelectedNBATeams] = useState([]);
  const [selectedNFLTeams, setSelectedNFLTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // NBA teams data
  const nbaTeams = [
    "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
    "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors",
    "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies",
    "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
    "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
    "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
  ];
  
  // NFL teams data
  const nflTeams = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills", "Carolina Panthers",
    "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns", "Dallas Cowboys", "Denver Broncos",
    "Detroit Lions", "Green Bay Packers", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars",
    "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
    "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants", "New York Jets",
    "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers", "Seattle Seahawks", "Tampa Bay Buccaneers",
    "Tennessee Titans", "Washington Commanders"
  ];

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      setUser(currentUser);
      loadSavedTeams(currentUser.email);
    } else {
      window.location.href = '/';
    }
    setIsLoading(false);
  };

  const loadSavedTeams = (userEmail) => {
    const savedTeams = JSON.parse(localStorage.getItem(`teams_${userEmail}`)) || {
      nba: [],
      nfl: []
    };
    setSelectedNBATeams(savedTeams.nba);
    setSelectedNFLTeams(savedTeams.nfl);
  };

  const handleTeamToggle = (team, league) => {
    if (league === 'nba') {
      setSelectedNBATeams(prev => {
        const newTeams = prev.includes(team)
          ? prev.filter(t => t !== team)
          : [...prev, team];
        return newTeams;
      });
    } else {
      setSelectedNFLTeams(prev => {
        const newTeams = prev.includes(team)
          ? prev.filter(t => t !== team)
          : [...prev, team];
        return newTeams;
      });
    }
  };

  const savePreferences = () => {
    if (user && user.email) {
      const teamsData = {
        nba: selectedNBATeams,
        nfl: selectedNFLTeams
      };
      localStorage.setItem(`teams_${user.email}`, JSON.stringify(teamsData));
      alert('Team preferences saved successfully!');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="teams-container">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        
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

      <div className="container">
        <div className="welcome-message">
          Welcome, {user?.firstName} {user?.lastName}! Select your favorite teams below.
        </div>

        <div className="team-container">
          <h1>Select Your Favorite NBA and NFL Teams</h1>
          
          <div className="section">
            <h2>NBA Teams</h2>
            <div className="teams">
              {nbaTeams.map(team => (
                <div key={team} className="team">
                  <input
                    type="checkbox"
                    id={team}
                    checked={selectedNBATeams.includes(team)}
                    onChange={() => handleTeamToggle(team, 'nba')}
                  />
                  <label htmlFor={team}>{team}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>NFL Teams</h2>
            <div className="teams">
              {nflTeams.map(team => (
                <div key={team} className="team">
                  <input
                    type="checkbox"
                    id={team}
                    checked={selectedNFLTeams.includes(team)}
                    onChange={() => handleTeamToggle(team, 'nfl')}
                  />
                  <label htmlFor={team}>{team}</label>
                </div>
              ))}
            </div>
          </div>

          <button onClick={savePreferences}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default Teams; 
