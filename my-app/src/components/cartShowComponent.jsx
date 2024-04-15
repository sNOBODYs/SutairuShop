import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../styles/cartShowComponent.css";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { updateCartStart, updateCartSuccess, updateCartFailure } from '../redux/cart/cartSlice.js';


export default function CartShowComponent({ isOpen, onClose }) {
    const currentCart = useSelector(state => state.cart.currentCart);
    const { currentUser, loading, error } = useSelector(state => state.user);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const storage = getStorage();


    useEffect(() => {
        if (currentCart && currentCart.cart) {
            fetchProductImages(currentCart.cart.products);
        }
    }, [currentCart]);

    const handleUpdate = async (productId, quantity, size, name, image, price) => {
        try {
            dispatch(updateCartStart());
            const formData = {
                productId: productId,
                productQuantity: quantity,
                productSize: size,
                productName: name,
                productImage: image,
                productPrice: price
            };
            const res = await fetch(`https://sutairushop-backend.onrender.com/api/cart/update/${currentUser._id}`, {
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
    };

    const handleRemove = async (productId) => {
        try {
            dispatch(updateCartStart());
            const formData = {
                productId: productId,
                productQuantity: 0,
                productSize: ''
            };
            const res = await fetch(`https://sutairushop-backend.onrender.com/api/cart/update/${currentUser._id}`, {
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
    };
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
        <div className={`overlay ${isOpen ? 'overlay-show' : ''}`} onClick={onClose}>
            <div className={`cartShowComponent ${isOpen ? 'cartShowComponent-show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="cartmini-container">
                    <div className="close-cartmini">
                        <div className="closecartmini-button" onClick={onClose}>
                            <p>X</p>
                        </div>
                    </div>
                    {currentCart && currentCart.cart && currentCart.cart.products && currentCart.cart.products.length > 0 ? (
                        <div className="scrolabble-container-products-cartmini">
                            {cartItems.map((item, index) => (
                                <div className="product-cartmini" key={index}>
                                    <div className="product-cartmini-image">
                                        <img src={item.imageURL} alt={item.productName} />
                                    </div>
                                    <div className="product-cartmini-col1">
                                        <p className='product-cartmini-name'>{item.productName}</p>
                                        <p className='product-cartmini-price'>${item.productPrice}.00</p>
                                        {item.productSize && ( // Conditionally render size container if item.productSize exists
                                            <div className="product-cartmini-size-container">
                                                <p className='product-cartmini-size'>Size:
                                                    <select value={item.productSize} onChange={(e) => handleUpdate(item.productId, item.productQuantity, e.target.value, item.productName, item.productImage, item.productPrice)}>
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="L">L</option>
                                                        <option value="XL">XL</option>
                                                        <option value="XXL">XXL</option>
                                                    </select>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-cartmini-quantity-remove">
                                        <input className='product-cartmini-quantity' type="number" value={item.productQuantity} onChange={(e) => handleUpdate(item.productId, e.target.value, item.productSize, item.productName, item.productImage, item.productPrice)} min="1" />
                                        <button className='remove-button-cartmini' onClick={() => handleRemove(item.productId)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='no-products-cart'>{!currentCart ? "No cart available." : "No products in cart. You should put some!"}</p>
                    )}
                    {currentCart && currentCart.cart && currentCart.cart.products && currentCart.cart.products.length > 0 ? (

                        <div className="cartmini-footer">
                            <div className="cartmini-sum">
                                <p className='title-sum'>Subtotal:</p>
                                <p className='cartmini-amount'>${calculateTotalAmount()}.00</p>
                            </div>
                            <div className="checkout-button-cartmini">
                                <Link to={`/checkout/${currentCart.cart._id}`}>
                                    <button onClick={onClose}>Checkout</button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="cartmini-footer">
                            <div className="cartmini-sum">
                                <p className='title-sum'>Subtotal:</p>
                                <p className='cartmini-amount'>$0.00</p>
                            </div>
                            <div className="checkout-button-cartmini">
                                <button disabled onClick={onClose}>Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
