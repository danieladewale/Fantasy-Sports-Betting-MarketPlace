import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState({
    activeBets: [],
    completedBets: [],
    totalProfit: 0,
    winRate: 0
  });
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Get current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // If no current user, redirect to login
    if (!currentUser) {
      navigate('/');
      return;
    }

    // Set current user
    if (currentUser) {
      setUser(currentUser);
      setIsOwnProfile(!userId || userId === currentUser.id);
    }

    // If viewing another user's portfolio, get their data
    if (userId) {
      // Mock data for different users
      const mockUsers = {
        '1': { id: '1', name: 'Michael Jordan', totalBets: 150, winRate: 68.5 },
        '2': { id: '2', name: 'Tom Brady', totalBets: 120, winRate: 62.3 },
        '3': { id: '3', name: 'LeBron James', totalBets: 180, winRate: 58.9 },
        '4': { id: '4', name: 'Patrick Mahomes', totalBets: 90, winRate: 55.2 },
        '5': { id: '5', name: 'Stephen Curry', totalBets: 200, winRate: 72.0 }
      };

      const userData = mockUsers[userId];
      if (userData) {
        setUser(userData);
        // Generate mock portfolio data for this user
        setPortfolioData({
          activeBets: [
            {
              id: 1,
              team1: 'Lakers',
              team2: 'Warriors',
              betAmount: 200 * Math.random(),
              potentialWinnings: 380 * Math.random(),
              odds: 1.9,
              date: '2024-03-25',
              type: 'Spread'
            },
            {
              id: 2,
              team1: 'Celtics',
              team2: 'Heat',
              betAmount: 150 * Math.random(),
              potentialWinnings: 285 * Math.random(),
              odds: 1.9,
              date: '2024-03-26',
              type: 'Moneyline'
            }
          ],
          completedBets: [
            {
              id: 3,
              team1: 'Nets',
              team2: 'Bucks',
              betAmount: 100,
              winnings: 190,
              result: 'Won',
              date: '2024-03-20',
              type: 'Over/Under'
            },
            {
              id: 4,
              team1: 'Eagles',
              team2: 'Cowboys',
              betAmount: 120,
              winnings: -120,
              result: 'Lost',
              date: '2024-03-19',
              type: 'Spread'
            }
          ],
          totalProfit: Math.floor(1000 * Math.random()),
          winRate: userData.winRate
        });
      } else {
        // User not found
        navigate('/leaderboard');
      }
    } else {
      // Get own portfolio from localStorage
      const savedPortfolio = JSON.parse(localStorage.getItem('userPortfolio'));
      if (savedPortfolio) {
        setPortfolioData(savedPortfolio);
      }
    }
  }, [userId, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <div className="header-content">
          <Link to="/leaderboard" className="back-button">← Back to Leaderboard</Link>
          <h1>{isOwnProfile ? 'My Portfolio' : `${user.name}'s Portfolio`}</h1>
          {user && (
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-label">Total Profit:</span>
                <span className={`stat-value ${portfolioData.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(portfolioData.totalProfit)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Win Rate:</span>
                <span className="stat-value">{portfolioData.winRate.toFixed(1)}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Bets:</span>
                <span className="stat-value">{user.totalBets || 0}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="active-bets">
        <h2>Active Bets</h2>
        <div className="bets-grid">
          {portfolioData.activeBets.map(bet => (
            <div key={bet.id} className="bet-card">
              <div className="bet-header">
                <span className="bet-type">{bet.type}</span>
                <span className="bet-date">{bet.date}</span>
              </div>
              <div className="bet-teams">
                <span>{bet.team1}</span>
                <span className="vs">vs</span>
                <span>{bet.team2}</span>
              </div>
              <div className="bet-details">
                <div className="detail-item">
                  <span>Bet Amount:</span>
                  <span>{formatCurrency(bet.betAmount)}</span>
                </div>
                <div className="detail-item">
                  <span>Potential Win:</span>
                  <span className="potential-win">{formatCurrency(bet.potentialWinnings)}</span>
                </div>
                <div className="detail-item">
                  <span>Odds:</span>
                  <span>{bet.odds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="completed-bets">
        <h2>Completed Bets</h2>
        <div className="bets-grid">
          {portfolioData.completedBets.map(bet => (
            <div key={bet.id} className="bet-card">
              <div className="bet-header">
                <span className="bet-type">{bet.type}</span>
                <span className="bet-date">{bet.date}</span>
              </div>
              <div className="bet-teams">
                <span>{bet.team1}</span>
                <span className="vs">vs</span>
                <span>{bet.team2}</span>
              </div>
              <div className="bet-details">
                <div className="detail-item">
                  <span>Bet Amount:</span>
                  <span>{formatCurrency(bet.betAmount)}</span>
                </div>
                <div className="detail-item">
                  <span>Result:</span>
                  <span className={`bet-result ${bet.result.toLowerCase()}`}>{bet.result}</span>
                </div>
                <div className="detail-item">
                  <span>Profit/Loss:</span>
                  <span className={bet.winnings > 0 ? 'positive' : 'negative'}>
                    {formatCurrency(bet.winnings - bet.betAmount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Sports Betting. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio; 