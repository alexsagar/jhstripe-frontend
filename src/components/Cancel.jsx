import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <div className="container">
        <div className="cancel-card">
          <div className="cancel-icon">
            <XCircle size={80} />
          </div>
          
          <h1 className="cancel-title">Payment Cancelled</h1>
          <p className="cancel-message">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <div className="action-buttons">
            <button 
              className="primary-button"
              onClick={() => navigate('/games')}
            >
              <RotateCcw size={20} />
              Try Again
            </button>
            <button 
              className="secondary-button"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;