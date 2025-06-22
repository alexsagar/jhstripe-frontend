// src/components/CheckoutPage.jsx
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../stripe';
import CheckoutForm from './CheckoutForm'; // You'll build this

export default function CheckoutPage({ clientSecret }) {
  const appearance = { theme: 'stripe' };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    )
  );
}
