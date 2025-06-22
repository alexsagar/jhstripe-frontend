import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const AmountSelection = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const games = {
    juwa: { name: 'Juwa', color: '#FF6B6B' },
    orionstar: { name: 'OrionStar', color: '#4ECDC4' },
    gamevault: { name: 'GameVault', color: '#45B7D1' },
    milkyway: { name: 'MilkyWay', color: '#96CEB4' },
    firekirin: { name: 'FireKirin', color: '#FFEAA7' },
    pandamaster: { name: 'PandaMaster', color: '#DDA0DD' },
    vegassweep: { name: 'VegasSweep', color: '#FFB347' },
    vblink: { name: 'VBlink', color: '#87CEEB' },
    gameroom: { name: 'GameRoom', color: '#F0E68C' },
  };

  const presetAmounts = [10, 25, 50, 100, 200, 500];
  const currentGame = games[gameId];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 10000)) {
      setCustomAmount(value);
      setSelectedAmount('');
    }
  };

  const handleProceedToPayment = async () => {
    const amount = parseFloat(selectedAmount || customAmount);

    if (!amount || amount < 1 || isNaN(amount)) {
      alert('Please select or enter a valid amount');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          gameName: currentGame.name,
          amount: parseFloat(amount.toFixed(2)),
        }),
      });

      const data = await response.json();

      if (!data.sessionId) {
        throw new Error('Invalid response from server');
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      alert('Failed to create payment session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentGame) {
    return <div>Game not found</div>;
  }

  return (
    <div className="amount-selection">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/games')}>
          <ArrowLeft size={20} />
          Back to Games
        </button>
        <div className="game-info">
          <div className="game-badge" style={{ backgroundColor: currentGame.color }}>
            {currentGame.name.charAt(0)}
          </div>
          <div>
            <h1 className="page-title">Load Credits to {currentGame.name}</h1>
            <p className="page-subtitle">Choose amount to add to your account</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="amount-section">
          <h2 className="section-title">Quick Select</h2>
          <div className="preset-amounts">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                onClick={() => handleAmountSelect(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="custom-amount-section">
            <h2 className="section-title">Custom Amount</h2>
            <div className="custom-amount-input">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter amount (1-10000)"
                min="1"
                max="10000"
                step="0.01"
              />
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Game:</span>
                <span>{currentGame.name}</span>
              </div>
              <div className="summary-row">
                <span>Amount:</span>
                <span className="amount-display">
                  ${selectedAmount || customAmount || '0.00'}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${selectedAmount || customAmount || '0.00'}</span>
              </div>
            </div>

            <button
              className="checkout-button"
              onClick={handleProceedToPayment}
              disabled={(!selectedAmount && !customAmount) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="loading-spinner" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Proceed to Payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountSelection;
