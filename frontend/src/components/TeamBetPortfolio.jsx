import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import '../styles/TeamBetPortfolio.css';

const TeamBetPortfolio = () => {
  const { teamName, league } = useParams();
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('profit');
  const [timeFrame, setTimeFrame] = useState('all');
  const [followedEngineers, setFollowedEngineers] = useState(new Set());

  useEffect(() => {
    fetchPortfolios();
  }, [teamName, league, timeFrame]);

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      // This would be replaced with actual API call
      const mockData = [
        {
          id: 1,
          engineerName: "John Smith",
          profit: 15000,
          winRate: 0.75,
          riskLevel: "Medium",
          recentBets: [
            { id: 1, type: "Win", amount: 1000, odds: 1.5, result: "Won", profit: 500, date: "2024-03-15" },
            { id: 2, type: "Spread", amount: 800, odds: 2.0, result: "Lost", profit: -800, date: "2024-03-14" }
          ],
          strategy: "Focus on home games and player injuries",
          totalBets: 48,
          averageStake: 950
        },
        {
          id: 2,
          engineerName: "Sarah Johnson",
          profit: 22000,
          winRate: 0.82,
          riskLevel: "Low",
          recentBets: [
            { id: 3, type: "Win", amount: 1500, odds: 1.3, result: "Won", profit: 450, date: "2024-03-15" },
            { id: 4, type: "Over/Under", amount: 1000, odds: 1.9, result: "Won", profit: 900, date: "2024-03-13" }
          ],
          strategy: "Statistical analysis of team performance trends",
          totalBets: 65,
          averageStake: 1200
        },
        {
          id: 3,
          engineerName: "Mike Wilson",
          profit: 35000,
          winRate: 0.68,
          riskLevel: "High",
          recentBets: [
            { id: 5, type: "Spread", amount: 2000, odds: 2.5, result: "Won", profit: 3000, date: "2024-03-15" },
            { id: 6, type: "Win", amount: 2500, odds: 3.0, result: "Lost", profit: -2500, date: "2024-03-12" }
          ],
          strategy: "High-risk, high-reward approach focusing on underdogs",
          totalBets: 32,
          averageStake: 2250
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPortfolios(mockData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  const sortPortfolios = (portfolios) => {
    return [...portfolios].sort((a, b) => {
      switch (sortBy) {
        case 'profit':
          return b.profit - a.profit;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'risk':
          const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        default:
          return 0;
      }
    });
  };

  const handleFollowEngineer = (engineerId) => {
    setFollowedEngineers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(engineerId)) {
        newSet.delete(engineerId);
      } else {
        newSet.add(engineerId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading portfolios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error Loading Portfolios</h2>
        <p>{error}</p>
        <button onClick={fetchPortfolios} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  const sortedPortfolios = sortPortfolios(portfolios);

  return (
    <div className="team-portfolio-container">
      <header className="header">
        <div className="back-button-container">
          <Link to="/teams" className="back-button">
            <span>←</span>
            <span>Back to Teams</span>
          </Link>
        </div>
        <div className="team-info">
          <div className="team-logo">
            <TeamLogo teamName={teamName} league={league} />
          </div>
          <h1>{teamName}</h1>
        </div>
        <div className="filters">
          <select 
            value={timeFrame} 
            onChange={(e) => setTimeFrame(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="month">Past Month</option>
            <option value="week">Past Week</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="profit">Sort by Profit</option>
            <option value="winRate">Sort by Win Rate</option>
            <option value="risk">Sort by Risk Level</option>
          </select>
        </div>
      </header>

      <main className="portfolio-grid">
        {sortedPortfolios.map(portfolio => (
          <div key={portfolio.id} className="portfolio-card">
            <div className="portfolio-header">
              <h2>{portfolio.engineerName}</h2>
              <span className={`risk-badge ${portfolio.riskLevel.toLowerCase()}`}>
                {portfolio.riskLevel} Risk
              </span>
            </div>
            
            <div className="portfolio-stats">
              <div className="stat">
                <span className="stat-label">Total Profit</span>
                <span className="stat-value">${portfolio.profit.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value">{(portfolio.winRate * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="additional-stats">
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <span className="stat-info">
                  <span className="stat-label">Total Bets</span>
                  <span className="stat-value">{portfolio.totalBets}</span>
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <span className="stat-info">
                  <span className="stat-label">Avg Stake</span>
                  <span className="stat-value">${portfolio.averageStake}</span>
                </span>
              </div>
            </div>

            <div className="recent-bets">
              <h3>Recent Bets</h3>
              {portfolio.recentBets.map(bet => (
                <div key={bet.id} className={`bet-item ${bet.result.toLowerCase()}`}>
                  <div className="bet-info">
                    <span className="bet-type">{bet.type}</span>
                    <div className="bet-details">
                      <span className="bet-amount">${bet.amount}</span>
                      <span className="bet-date">{formatDate(bet.date)}</span>
                    </div>
                  </div>
                  <div className="bet-result">
                    <span className="result-label">{bet.result}</span>
                    <span className={`profit ${bet.profit < 0 ? 'negative' : ''}`}>
                      {bet.profit >= 0 ? '+' : ''}{bet.profit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="strategy">
              <h3>Strategy</h3>
              <p>{portfolio.strategy}</p>
            </div>

            <button 
              className={`follow-button ${followedEngineers.has(portfolio.id) ? 'following' : ''}`}
              onClick={() => handleFollowEngineer(portfolio.id)}
            >
              {followedEngineers.has(portfolio.id) ? 'Following' : 'Follow Engineer'}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TeamBetPortfolio; 