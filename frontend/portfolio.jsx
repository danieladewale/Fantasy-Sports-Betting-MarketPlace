import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();

  const selectPortfolio = (riskLevel, name) => {
    localStorage.setItem('selectedPortfolio', JSON.stringify({
      riskLevel,
      name
    }));
    navigate('/');
  };

  const highRiskPortfolios = [
    {
      name: 'Alex "ThrillSeeker" Thompson',
      username: '@thrillseeker',
      rating: 4.5,
      winRate: '42%',
      description: 'Known for making bold predictions and taking calculated risks. Specializes in underdog victories and high-stakes parlays. Despite the lower win rate, their successful bets often result in significant payouts.'
    },
    {
      name: 'Sarah "RiskMaster" Chen',
      username: '@riskmaster',
      rating: 5,
      winRate: '42%',
      description: 'Expert in identifying high-value opportunities with significant upside potential. Focuses on long-shot bets and complex multi-leg parlays. Their aggressive strategy has led to some of the biggest payouts in the community.'
    }
  ];

  const lowRiskPortfolios = [
    {
      name: 'Michael "SteadyHand" Rodriguez',
      username: '@steadyhand',
      rating: 5,
      winRate: '48%',
      description: 'Master of conservative betting strategies with a focus on consistent returns. Specializes in moneyline favorites and well-researched prop bets. Their disciplined approach has built a reputation for reliable, steady gains.'
    },
    {
      name: 'Emma "SafeBet" Wilson',
      username: '@safebet',
      rating: 4.5,
      winRate: '48%',
      description: 'Expert in analyzing historical data and identifying safe betting opportunities. Focuses on spread betting and over/under markets. Their methodical approach has consistently delivered positive returns over time.'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<i key={i} className="fa fa-star"></i>);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<i key={i} className="fa fa-star-half-o"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star-o"></i>);
      }
    }
    return stars;
  };

  const PortfolioCard = ({ portfolio, riskLevel }) => (
    <div className={`portfolio-card ${riskLevel}-risk`}>
      <h3>{portfolio.name}</h3>
      <div className="username">{portfolio.username}</div>
      <div className="rating">
        {renderStars(portfolio.rating)}
      </div>
      <div className="win-rate">Win Rate: {portfolio.winRate}</div>
      <div className="description">{portfolio.description}</div>
      <button 
        className="select-button"
        onClick={() => selectPortfolio(riskLevel, portfolio.name)}
      >
        Select Portfolio
      </button>
    </div>
  );

  return (
    <main>
      <div className="portfolio-section">
        <h2>High Risk Portfolios</h2>
        <div className="portfolio-grid">
          {highRiskPortfolios.map((portfolio, index) => (
            <PortfolioCard 
              key={index} 
              portfolio={portfolio} 
              riskLevel="high"
            />
          ))}
        </div>
      </div>

      <div className="portfolio-section">
        <h2>Low Risk Portfolios</h2>
        <div className="portfolio-grid">
          {lowRiskPortfolios.map((portfolio, index) => (
            <PortfolioCard 
              key={index} 
              portfolio={portfolio} 
              riskLevel="low"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
