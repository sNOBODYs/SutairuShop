import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCartFailure, updateCartStart, updateCartSuccess, getCartStart, getCartSuccess, getCartFailure } from '../redux/cart/cartSlice.js';
import "../styles/CheckoutView.css";
import { Alert } from 'react-bootstrap';

const CheckoutView = () => {
  const currentCart = useSelector(state => state.cart.currentCart);
  const [cartItems, setCartItems] = useState([]);
  const storage = getStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    detailInfo: '',
    city: '',
    phone: ''
  });
  const [allRequiredFieldsFilled, setAllRequiredFieldsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const closeActiveState = 1;
  let userId = currentCart.cart.userId;

  useEffect(() => {
    if (currentCart && currentCart.cart) {
      fetchProductImages(currentCart.cart.products);
    }
  }, [currentCart]);


  useEffect(() => {
    // Check if all required fields are filled whenever deliveryInfo changes
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'phone'];
    const filled = requiredFields.every(field => deliveryInfo[field].trim() !== '');
    setAllRequiredFieldsFilled(filled);
  }, [deliveryInfo]);

  const fetchProductImages = async (products) => {
    const updatedCartItems = [];
    for (const product of products) {
      const imageURL = product.productImage;
      try {
        const downloadURL = await getDownloadURL(ref(storage, imageURL));
        updatedCartItems.push({ ...product, imageURL: downloadURL });
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    setCartItems(updatedCartItems);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.productQuantity * item.productPrice;
    });
    return total;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handleUpdate = async () => {
    if (!allRequiredFieldsFilled) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    try {
      dispatch(updateCartStart());
      const formData = {
        deliveryInfo,
        closeActiveState
      };
      const res = await fetch(`http://localhost:3000/api/cart/update-delivery/${userId}`, { // Use the stored user ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateCartFailure(data.message));
        return;
      }
      dispatch(updateCartSuccess(data));
    } catch (error) {
      console.log(error);
    }
    try {
      dispatch(getCartStart());
      const cartRes = await fetch(`http://localhost:3000/api/cart/get/${userId}`, { // Use the stored user ID
        method: 'GET',
        credentials: 'include',
      });
      const cartData = await cartRes.json();
      if (cartData.success === false) {
        throw new Error(cartData.message);
      }
      dispatch(getCartSuccess(cartData));
      navigate('/');
    } catch (error) {
      dispatch(getCartFailure(error.message));
    }
  };

  return (
    <div>
      <div className="checkout-container">
        <div className="container-checkout1">
          <div className="checkout-col1">
            <h1>Delivery</h1>
            <div className="checkout-container-name">
              <input type="text" className='checkout-fname' name="firstName" value={deliveryInfo.firstName} onChange={handleInputChange} placeholder="First name" required />
              <input type="text" className='checkout-lname' name="lastName" value={deliveryInfo.lastName} onChange={handleInputChange} placeholder="Last name" required />
            </div>
            <input type="text" className='checkout-company' name="company" value={deliveryInfo.company} onChange={handleInputChange} placeholder="Company (optional)" />
            <input type="text" className='checkout-address' name="address" value={deliveryInfo.address} onChange={handleInputChange} placeholder="Address" required />
            <input type="text" className='checkout-aditional-info' name="detailInfo" value={deliveryInfo.detailInfo} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" />
            <div className="checkout-container-city-info">
              <input type="text" className='checkout-city' name="city" value={deliveryInfo.city} onChange={handleInputChange} placeholder="City" required />
              <input type="text" className='checkout-post-code' placeholder="Postal code" required />
            </div>
            <input type="text" className='checkout-phone' name="phone" value={deliveryInfo.phone} onChange={handleInputChange} placeholder="Phone" required />
            <h1>Payment</h1>
            {errorMessage && <Alert className='w-100 mt-3' variant="danger">{errorMessage}</Alert>}
            <button className='checkout-payment' onClick={handleUpdate}>Pay now</button>
          </div>
        </div>
        <div className="container-checkout2">
          <div className="checkout-col2">
            <div className="checkout-products">
              {cartItems.map((item, index) => (
                <div className="product-checkout" key={index}>
                  <div className="product-checkout-image">
                    <img src={item.imageURL} alt={item.productName} />
                  </div>
                  <div className="product-checkout-row">
                    <div className="product-checkout-quantity-container">
                      <p className='product-checkout-quantity'>{item.productQuantity}</p>
                    </div>
                    <div className="product-checkout-col">
                      <p className='product-checkout-name'>{item.productName}</p>
                      {item.productSize && ( // Conditionally render size if it exists
                        <p className='product-checkout-size'>Size: {item.productSize}</p>
                      )}
                    </div>
                    <p className='product-checkout-price'>${item.productPrice}.00</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-footer">
                <div className="checkout-sum">
                  <p className='checkout-title-sum'>Subtotal:</p>
                  <p className='checkout-amount'>${calculateTotalAmount()}.00</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;