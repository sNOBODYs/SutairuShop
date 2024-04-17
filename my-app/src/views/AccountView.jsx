import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getHistoryStart, getHistorySuccess, getHistoryFailure } from '../redux/cart/historySlice';
import "../styles/AccountView.css";
import FooterComponent from "../components/FooterComponent";

export default function AccountView() {
  const { currentUser } = useSelector(state => state.user);
  const { currentCart, isLoading, error: cartError } = useSelector(state => state.history);
  const dispatch = useDispatch();
 

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    dispatch(getHistoryStart());
    try {
      const userId = currentUser._id;
      const cartRes = await fetch(`https://sutairushop-backend.onrender.com/api/cart/get-history/${userId}`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      });
      const cartData = await cartRes.json();
      if (cartData.success === false) {
        throw new Error(cartData.message);
      }
      dispatch(getHistorySuccess(cartData));
    } catch (error) {
      dispatch(getHistoryFailure(error.message));
    }
  };

  // Create a sorted copy of the cart history array
  const sortedOrders = currentCart && [...currentCart.carts].sort((a, b) => {
    return new Date(b.deliveryInfo[0].createdAt) - new Date(a.deliveryInfo[0].createdAt);
  });

  return (
    <>
      <div className="whole-accountview">
        <h2 className="profile-accountview">Profile</h2>
        <div className="accountview-container">
          <div className="accountview-col1">
            <p className="history-profile">History</p>
            {/* Render sorted cart history */}
            {sortedOrders && sortedOrders.map((cart, cartIndex) => (
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
            <p className="current-account-profile">Current Account</p>
            <div className="account-details">
              <img className='profile-picture-accview' src={currentUser.profilePicture} alt="user profile picture"/>
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
      </div>
      <FooterComponent/>
    </>
  )
}
