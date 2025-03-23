import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
  const [highRiskPortfolios, setHighRiskPortfolios] = useState([]);
  const [lowRiskPortfolios, setLowRiskPortfolios] = useState([]);

  // Name components for random generation
  const firstNames = [
    'Alex', 'Sarah', 'Michael', 'Emma', 'James', 'Sophia', 'David', 'Olivia',
    'Daniel', 'Isabella', 'William', 'Ava', 'Joseph', 'Mia', 'Thomas', 'Charlotte'
  ];

  const lastNames = [
    'Thompson', 'Chen', 'Rodriguez', 'Wilson', 'Smith', 'Johnson', 'Williams',
    'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Anderson', 'Taylor', 'Thomas'
  ];

  const nicknames = [
    'ThrillSeeker', 'RiskMaster', 'SteadyHand', 'SafeBet', 'LuckyStrike',
    'FortuneFinder', 'BetPro', 'WiseGambler', 'RiskTaker', 'SmartBet',
    'BetKing', 'BetQueen', 'RiskRunner', 'SafePlayer', 'BetMaster'
  ];

  // Description templates for random generation
  const highRiskTemplates = [
    'Known for making bold predictions and taking calculated risks. Specializes in {specialty}. Despite the lower win rate, their successful bets often result in significant payouts.',
    'Expert in identifying high-value opportunities with significant upside potential. Focuses on {specialty}. Their aggressive strategy has led to some of the biggest payouts in the community.',
    'Master of high-stakes betting with a focus on {specialty}. Their daring approach has resulted in both spectacular wins and losses, but the wins have been truly remarkable.',
    'Specializes in long-shot bets and complex multi-leg parlays. Known for {specialty}. Their high-risk strategy has produced some of the most memorable victories in recent history.'
  ];

  const lowRiskTemplates = [
    'Master of conservative betting strategies with a focus on consistent returns. Specializes in {specialty}. Their disciplined approach has built a reputation for reliable, steady gains.',
    'Expert in analyzing historical data and identifying safe betting opportunities. Focuses on {specialty}. Their methodical approach has consistently delivered positive returns over time.',
    'Known for their careful analysis and risk management. Specializes in {specialty}. Their conservative strategy has proven effective in maintaining steady growth.',
    'Expert in identifying value bets with minimal risk. Focuses on {specialty}. Their calculated approach has resulted in consistent, reliable returns.'
  ];

  const specialties = [
    'underdog victories', 'high-stakes parlays', 'long-shot bets', 'complex multi-leg parlays',
    'moneyline favorites', 'well-researched prop bets', 'spread betting', 'over/under markets',
    'first-half bets', 'player props', 'game props', 'live betting', 'futures markets'
  ];

  const generateRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    return `${firstName} "${nickname}" ${lastName}`;
  };

  const generateRandomUsername = (name) => {
    const firstName = name.split(' ')[0].toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    return `@${firstName}${randomNum}`;
  };

  const generateRandomDescription = (templates) => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    return template.replace('{specialty}', specialty);
  };

  const generatePortfolios = () => {
    // Generate high risk portfolios
    const highRisk = Array(2).fill(null).map(() => {
      const name = generateRandomName();
      return {
        name,
        username: generateRandomUsername(name),
        rating: Math.random() < 0.5 ? 4.5 : 5,
        winRate: '42%',
        description: generateRandomDescription(highRiskTemplates)
      };
    });

    // Generate low risk portfolios
    const lowRisk = Array(2).fill(null).map(() => {
      const name = generateRandomName();
      return {
        name,
        username: generateRandomUsername(name),
        rating: Math.random() < 0.5 ? 4.5 : 5,
        winRate: '48%',
        description: generateRandomDescription(lowRiskTemplates)
      };
    });

    setHighRiskPortfolios(highRisk);
    setLowRiskPortfolios(lowRisk);
  };

  useEffect(() => {
    generatePortfolios();
  }, []);

  const selectPortfolio = (riskLevel, name) => {
    localStorage.setItem('selectedPortfolio', JSON.stringify({
      riskLevel,
      name
    }));
    navigate('/');
  };

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
