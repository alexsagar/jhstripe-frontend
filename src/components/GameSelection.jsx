import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GameSelection = () => {
  const navigate = useNavigate();

  const games = [
    { id: 'juwa', name: 'Juwa', color: '#FF6B6B', description: 'Classic slots and casino games' },
    { id: 'orionstar', name: 'OrionStar', color: '#4ECDC4', description: 'Space-themed gaming adventure' },
    { id: 'gamevault', name: 'GameVault', color: '#45B7D1', description: 'Premium gaming collection' },
    { id: 'milkyway', name: 'MilkyWay', color: '#96CEB4', description: 'Cosmic gaming experience' },
    { id: 'firekirin', name: 'FireKirin', color: '#FFEAA7', description: 'Dragon-themed slot games' },
    { id: 'pandamaster', name: 'PandaMaster', color: '#DDA0DD', description: 'Asian-inspired gaming' },
    { id: 'vegassweep', name: 'VegasSweep', color: '#FFB347', description: 'Vegas-style casino games' },
    { id: 'vblink', name: 'VBlink', color: '#87CEEB', description: 'Fast-paced gaming action' },
    { id: 'gameroom', name: 'GameRoom', color: '#F0E68C', description: 'Multi-game platform' }
  ];

  const handleGameSelect = (gameId) => {
    navigate(`/amount/${gameId}`);
  };

  return (
    <div className="game-selection">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1 className="page-title">Choose Your Game</h1>
        <p className="page-subtitle">Select a gaming platform to load credits</p>
      </div>

      <div className="container">
        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game.id}
              className="game-card"
              style={{ '--game-color': game.color }}
              onClick={() => handleGameSelect(game.id)}
            >
              <div className="game-card-inner">
                <div className="game-icon" style={{ backgroundColor: game.color }}>
                  {game.name.charAt(0)}
                </div>
                <h3 className="game-name">{game.name}</h3>
                <p className="game-description">{game.description}</p>
                <div className="game-card-overlay">
                  <span>Select Game</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSelection;