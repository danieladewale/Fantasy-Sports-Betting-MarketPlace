import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Teams from './components/Teams';
import PlaceBet from './components/PlaceBet';
import Leaderboard from './components/Leaderboard';
import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import Settings from './components/Settings';
import CashOut from './components/CashOut';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/place-bet" element={<PlaceBet />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:userId" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cash-out" element={<CashOut />} />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 