import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Home from './components/Home';
import Teams from './components/Teams';
import PlaceBet from './components/PlaceBet';
import CashOut from './components/CashOut';
import Leaderboard from './components/Leaderboard';
import Portfolio from './components/Portfolio';
import TeamBetPortfolio from './components/TeamBetPortfolio';

// Import styles
import './styles/global.css';
import './styles/animations.css';
import './styles/Home.css';
import './styles/Teams.css';
import './styles/PlaceBet.css';
import './styles/CashOut.css';
import './styles/Leaderboard.css';
import './styles/Portfolio.css';
import './styles/TeamBetPortfolio.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Protected Routes */}
          <Route
            path="/place-bet"
            element={
              <ProtectedRoute>
                <PlaceBet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cash-out"
            element={
              <ProtectedRoute>
                <CashOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team-portfolio/:teamName/:league"
            element={
              <ProtectedRoute>
                <TeamBetPortfolio />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 