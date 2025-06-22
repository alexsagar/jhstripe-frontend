import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, RotateCcw } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      setPaymentDetails(data.session);
    } catch (error) {
      console.error('Error verifying payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="success-page loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          
          <h1 className="success-title">Payment Successful!</h1>
          <p className="success-message">
            Your credits have been successfully loaded to your gaming account.
          </p>

          {paymentDetails && (
            <div className="payment-details">
              <h2>Transaction Details</h2>
              <div className="detail-row">
                <span>Amount:</span>
                <span>${(paymentDetails.amount_total / 100).toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span>Payment ID:</span>
                <span>{paymentDetails.id}</span>
              </div>
              <div className="detail-row">
                <span>Status:</span>
                <span className="status-paid">Paid</span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button 
              className="primary-button"
              onClick={() => navigate('/games')}
            >
              <RotateCcw size={20} />
              Load More Credits
            </button>
            <button 
              className="secondary-button"
              onClick={() => navigate('/')}
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;