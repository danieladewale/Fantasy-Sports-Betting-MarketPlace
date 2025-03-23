import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/CashOut.css';

const CashOut = ({ initialBalance = 1000 }) => {
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [availableWinnings] = useState(initialBalance);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCashOutAmount(value);
      setError(null);
    }
  };

  const processCashOut = async () => {
    const amount = parseFloat(cashOutAmount);
    
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount > availableWinnings) {
      setError('Insufficient funds to cash out!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      // to process the actual cashout
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert(`You have successfully cashed out $${amount}`);
      setCashOutAmount('');
    } catch (err) {
      setError('Failed to process cashout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cashout-container">
      <header className="header">
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
          <p className="winnings-amount">${availableWinnings.toFixed(2)}</p>

          <h2>Amount to Cash Out</h2>
          <input
            type="text"
            value={cashOutAmount}
            onChange={handleInputChange}
            placeholder="Enter Amount"
            className="cashout-input"
            disabled={isLoading}
          />

          {error && <p className="error-message">{error}</p>}

          <button 
            onClick={processCashOut} 
            className="cashout-button"
            disabled={isLoading || !cashOutAmount}
          >
            {isLoading ? 'Processing...' : 'Cash Out'}
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 BetIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

CashOut.propTypes = {
  initialBalance: PropTypes.number
};

export default CashOut; 