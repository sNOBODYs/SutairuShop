import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getHistoryStart, getHistorySuccess, getHistoryFailure } from '../redux/cart/historySlice';
import "../styles/AccountView.css";

export default function AccountView() {
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.user);
  const { currentCart, isLoading, error: cartError } = useSelector(state => state.history); // Assuming you have a cart reducer
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    dispatch(getHistoryStart()); // Dispatch action to indicate start of cart fetch
    try {
      const userId = currentUser._id; // Assuming you have userId available in currentUser
      const cartRes = await fetch(`http://localhost:3000/api/cart/get-history/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const cartData = await cartRes.json();
      if (cartData.success === false) {
        throw new Error(cartData.message);
      }
      dispatch(getHistorySuccess(cartData)); // Dispatch action with fetched cart data
    } catch (error) {
      setError(error.message);
      dispatch(getHistoryFailure(error.message)); // Dispatch action in case of error
    }
  };
  return (
    <>
      <h2 className="text-center mb-4">Profile</h2>
      <div className="accountview-container">
        <div className="accountview-col1">
          {/* Render cart history from cartData */}
          {currentCart && currentCart.carts.map((cart, cartIndex) => (
            <div key={cartIndex}>
              <h3>Order Date: {new Date(cart.deliveryInfo[0].createdAt).toLocaleDateString()}</h3>
              {/* Render products in each cart */}
              {cart.products.map((product, productIndex) => (
                <div key={productIndex}>
                  <p>Product Name: {product.productName}</p>
                  <p>Product Quantity: {product.productQuantity}</p>
                </div>
              ))}
              <p>Order ID {cart.cartId}</p>
            </div>
          ))}
          {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
          {cartError && <p>Error: {cartError}</p>} {/* Show error message */}
        </div>
        <div className="accountview-col2">
          <strong>Email:</strong> {currentUser.email}

          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </div>
      </div>
    </>
  )
}
