import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBets: 0,
    winRate: 0,
    totalProfit: 0,
    favoriteTeam: '',
    recentBets: []
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);

    // Mock stats data
    setStats({
      totalBets: 156,
      winRate: 68.5,
      totalProfit: 25000,
      favoriteTeam: 'Lakers',
      recentBets: [
        {
          id: 1,
          match: 'Lakers vs Warriors',
          type: 'Spread',
          amount: 200,
          result: 'Won',
          profit: 380,
          date: '2024-03-25'
        },
        {
          id: 2,
          match: 'Celtics vs Heat',
          type: 'Moneyline',
          amount: 150,
          result: 'Lost',
          profit: -150,
          date: '2024-03-24'
        },
        {
          id: 3,
          match: 'Eagles vs Cowboys',
          type: 'Over/Under',
          amount: 300,
          result: 'Won',
          profit: 270,
          date: '2024-03-23'
        }
      ]
    });
  }, [navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="header-content">
          <h1>My Profile</h1>
          <Link to="/settings" className="settings-link">
            Edit Profile Settings
          </Link>
        </div>
      </header>

      <div className="profile-content">
        <section className="user-info-section">
          <div className="user-info-card">
            <div className="user-avatar">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <div className="user-details">
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="user-email">{user.email}</p>
              <p className="join-date">Member since March 2024</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>Betting Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Bets</h3>
              <p>{stats.totalBets}</p>
            </div>
            <div className="stat-card">
              <h3>Win Rate</h3>
              <p>{stats.winRate}%</p>
            </div>
            <div className="stat-card">
              <h3>Total Profit</h3>
              <p className={stats.totalProfit >= 0 ? 'positive' : 'negative'}>
                {formatCurrency(stats.totalProfit)}
              </p>
            </div>
            <div className="stat-card">
              <h3>Favorite Team</h3>
              <p>{stats.favoriteTeam}</p>
            </div>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Bets</h2>
          <div className="bets-list">
            {stats.recentBets.map(bet => (
              <div key={bet.id} className="bet-card">
                <div className="bet-header">
                  <span className="bet-match">{bet.match}</span>
                  <span className="bet-date">{bet.date}</span>
                </div>
                <div className="bet-details">
                  <div className="bet-info">
                    <span className="bet-type">{bet.type}</span>
                    <span className="bet-amount">{formatCurrency(bet.amount)}</span>
                  </div>
                  <div className="bet-result">
                    <span className={`result ${bet.result.toLowerCase()}`}>
                      {bet.result}
                    </span>
                    <span className={`profit ${bet.profit >= 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(bet.profit)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile; 