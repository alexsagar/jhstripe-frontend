import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader, CreditCard } from 'lucide-react';
import '../loadCredits.css'; // Link to your custom CSS styles

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Available games
const games = {
  juwa: 'Juwa',
  orionstar: 'OrionStar',
  gamevault: 'GameVault',
  milkyway: 'MilkyWay',
  firekirin: 'FireKirin',
  pandamaster: 'PandaMaster',
  vegassweep: 'VegasSweep',
  vblink: 'VBlink',
  gameroom: 'GameRoom'
};

const LoadCredits = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleProceedToPayment = async () => {
    const amountValue = parseFloat(amount);

    // Basic validation
    if (!selectedGame || !amountValue || amountValue < 1 || amountValue > 25) {
      alert('Please select a game and enter a valid amount between $1 and $25.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://juwahouse.onrender.com/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gameId: selectedGame,
          gameName: games[selectedGame],
          amount: amountValue
        })
      });

      const data = await response.json();

      if (!data.sessionId) {
        throw new Error('Invalid Stripe session returned');
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="load-credits">
      <h1>Load Credits</h1>

      <label>Choose Game:</label>
      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">-- Select Game --</option>
        {Object.entries(games).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <label>Enter Amount ($1 - $25):</label>
      <input
        type="number"
        min="1"
        max="25"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 10"
      />

      <button
        className="checkout-button"
        disabled={!selectedGame || !amount || isLoading}
        onClick={handleProceedToPayment}
      >
        {isLoading ? (
          <>
            <Loader size={20} className="loading-spinner" />
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
  );
};

export default LoadCredits;
