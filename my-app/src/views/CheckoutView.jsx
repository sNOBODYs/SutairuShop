import React from 'react';
import { useParams } from 'react-router-dom';

const CheckoutView = () => {
  const { cartID } = useParams();
  console.log(cartID);

  return (
    <div>
      <h1>Cart Checkout:</h1> 
      <p>Cart ID: {cartID}</p>
    </div>
  );
};

export default CheckoutView;