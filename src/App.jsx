import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage.jsx';
import GameSelection from './components/GameSelection.jsx';
import AmountSelection from './components/AmountSelection.jsx';
import Success from './components/Success.jsx';
import Cancel from './components/Cancel.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GameSelection />} />
        <Route path="/amount/:gameId" element={<AmountSelection />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;