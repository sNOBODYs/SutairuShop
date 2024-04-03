import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getCartStart, getCartSuccess, getCartFailure } from '../redux/cart/cartSlice';
import "../styles/AccountView.css";

export default function AccountView() {
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.user);
  const { cartData, isLoading, error: cartError } = useSelector(state => state.cart); // Assuming you have a cart reducer
  const dispatch = useDispatch();
  const navigate = useNavigate();

// useEffect(() => {
//   if (!cartData) { // If cart data is not available, fetch it
//     fetchCartData();
//   }
// }, []); // Fetch cart data only on component mount
//
// const fetchCartData = async () => {
//   dispatch(getCartStart()); // Dispatch action to indicate start of cart fetch
//   try {
//     const userId = currentUser._id; // Assuming you have userId available in currentUser
//     const cartRes = await fetch(`http://localhost:3000/api/cart/get-history/${userId}`, {
//       method: 'GET',
//       credentials: 'include',
//     });
//     const cartData = await cartRes.json();
//     if (cartData.success === false) {
//       throw new Error(cartData.message);
//     }
//     dispatch(getCartSuccess(cartData)); // Dispatch action with fetched cart data
//   } catch (error) {
//     setError(error.message);
//     dispatch(getCartFailure(error.message)); // Dispatch action in case of error
//   }
// };
//
  return (
    <>
    <h2 className="text-center mb-4">Profile</h2>
    <div className="accountview-container">
      <div className="accountview-col1">
        {/* Render cart history from cartData */}
        {cartData && cartData.products.map((product, index) => (
          <div key={index}>
            <p>Product Name: {product.productName}</p>
            <p>Product Quantity: {product.productQuantity}</p>
            {/* Add other product details as needed */}
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
