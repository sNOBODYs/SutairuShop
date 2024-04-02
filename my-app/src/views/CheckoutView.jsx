import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { useSelector } from 'react-redux';
import "../styles/CheckoutView.css";

const CheckoutView = () => {
  const { cartID } = useParams();
  const currentCart = useSelector(state => state.cart.currentCart);
  const [cartItems, setCartItems] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    if (currentCart && currentCart.cart) {
      fetchProductImages(currentCart.cart.products);
    }
  }, [currentCart]);

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
  return (
    <div>
      <div className="checkout-container">
        <div className="container-checkout1">
          <div className="checkout-col1">
            <h1>Delivery</h1>
            <div className="checkout-container-name">
              <input type="text" className='checkout-fname' placeholder="First name" required />
              <input type="text" className='checkout-lname' placeholder="Last name" required />
            </div>
            <input type="text" className='checkout-company' placeholder="Company (optional)" />
            <input type="text" className='checkout-address' placeholder="Adress" required />
            <input type="text" className='checkout-aditional-info' placeholder="Apartment,suite,etc. (optional)" />
            <div className="checkout-container-city-info">
              <input type="text" className='checkout-city' placeholder="City" required />
              <input type="text" className='checkout-post-code' placeholder="Postal code" required />
            </div>
            <input type="text" className='checkout-phone' placeholder="Phone" required />
            <h1>Payment</h1>
            <button className='checkout-payment'>Pay now</button>
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
                      <p className='product-checkout-size'>Size:{item.productSize}</p>
                    </div>
                    <p className='product-checkout-price'>${item.productPrice}.00</p>
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default CheckoutView;