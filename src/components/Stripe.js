import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export function Stripe({ children }) {
  return <div>{children}</div>;
}

export function StripeCheckoutWrapper({ amount, currency, onSuccess, onCancel, children }) {
  const handleToken = (token) => {
    console.log('Token received', token);
    onSuccess();
  };

  return (
    <StripeCheckout
      stripeKey="your-public-key-here"
      token={handleToken}
      amount={amount}
      currency={currency}>
      {children}
    </StripeCheckout>
  );
}
