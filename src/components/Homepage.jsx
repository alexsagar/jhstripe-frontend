import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Zap, Shield, CreditCard } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <Gamepad2 size={80} />
          </div>
          <h1 className="hero-title">Juwa House</h1>
          <p className="hero-subtitle">
            Your ultimate gaming platform with instant credit loading
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/games')}
          >
            Start Gaming
            <Zap size={20} />
          </button>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose JuwaHouse?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={40} />
              </div>
              <h3>Secure Payments</h3>
              <p>Advanced encryption and secure payment processing with Stripe</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={40} />
              </div>
              <h3>Instant Loading</h3>
              <p>Credits are loaded instantly to your gaming account</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CreditCard size={40} />
              </div>
              <h3>Multiple Payment Options</h3>
              <p>Pay with Cashapp or Chime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;