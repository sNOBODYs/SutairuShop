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
    <div className="whole-accountview">
      <h2 className="profile-accountview">Profile</h2>
      <div className="accountview-container">
        <div className="accountview-col1">
          {/* Render cart history from cartData */}
          {currentCart && currentCart.carts.map((cart, cartIndex) => (
            <div className="order-container" key={cartIndex}>
              <h3 className="date-order">Order Date: {new Date(cart.deliveryInfo[0].createdAt).toLocaleDateString()}</h3>
              {/* Render products in each cart */}
              {cart.products.map((product, productIndex) => (
                <div className="item-accountview" key={productIndex}>
                  <p className="name-item-accountview">{product.productName}</p>
                  <div className="price-accountview">
                  <p className="quantity-item-accountview">{product.productQuantity}</p>
                  </div>
                </div>
              ))}
              <p className="order-id-accountview">Order ID {cart.cartId}</p>
            </div>
          ))}
          {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
          {cartError && <p>Error: {cartError}</p>} {/* Show error message */}
        </div>
        <div className="accountview-col2">
          <div className="accountview-col2-1">
            <div className="header-col2">
          <p className="email-col2">Email:</p>
          <p className="email-curr-col2">{currentUser.email} </p>
          </div>
          <Link to="/update-profile" className="button-updateprofile">
            Update Profile
          </Link>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
