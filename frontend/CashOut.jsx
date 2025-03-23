import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/fantasysportsbettinglogo.svg';
import '../styles/CashOut.css';

const CashOut = () => {
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [availableWinnings] = useState(1000); // This would come from your backend/state management

  const processCashOut = () => {
    const amount = parseFloat(cashOutAmount);
    
    if (amount > availableWinnings) {
      alert('Insufficient funds to cash out!');
    } else {
      alert(`You have successfully cashed out $${amount}`);
      // Here you would typically make an API call to your backend
      // to process the actual cashout
    }
  };

  return (
    <div className="cashout-container">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/place-bet" className="nav-link">Place Bet</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        </nav>
      </header>

      <main className="main-content">
        <h1>Cash Out</h1>

        <div className="cash-out-form">
          <h2>Available Winnings</h2>
          <p className="winnings-amount">${availableWinnings}</p>

          <h2>Amount to Cash Out</h2>
          <input
            type="number"
            value={cashOutAmount}
            onChange={(e) => setCashOutAmount(e.target.value)}
            placeholder="Enter Amount"
            className="cashout-input"
          />

          <button onClick={processCashOut} className="cashout-button">
            Cash Out
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Fantasy Sports Betting. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CashOut;
