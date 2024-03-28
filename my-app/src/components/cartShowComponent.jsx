import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../styles/cartShowComponent.css";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

export default function CartShowComponent() {
    const currentCart = useSelector(state => state.cart.currentCart);
    const [cartItems, setCartItems] = useState([]);
    const storage = getStorage();

    useEffect(() => {
        if (currentCart && currentCart.cart) {
            fetchProductImages(currentCart.cart);
        }
    }, [currentCart]);
 
    function handleUpdate(params) {
        
    }
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

    return (
        <div>
            <div className="cartmini-container">
                <div className="close-cartmini">
                    <div className="closecartmini-button">
                        <p>X</p>
                    </div>
                </div>
                <div className="scrolabble-container-products-cartmini">
                    {cartItems.map((item, index) => (
                        <div className="product-cartmini" key={index}>
                            <div className="product-cartmini-image">
                                <img src={item.imageURL} alt={item.productName} />
                            </div>
                            <div className="product-cartmini-col1">
                                <p className='product-cartmini-name'>{item.productName}</p>
                                <p className='product-cartmini-price'>${item.productPrice}.00</p>
                                <div className="product-cartmini-size-container">
                                <p className='product-cartmini-size'>Size:
                                <select value={item.productSize} onChange={handleUpdate()}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select></p>
                                </div>
                            </div>
                            <p className='product-cartmini-quantity'>Quantity: {item.productQuantity}</p>
                        </div>
                    ))}
                </div>
                <div className="cartmini-footer">
                    <div className="cartmini-sum">
                        <p className='title-sum'>Subtotal:</p>
                        <p className='cartmini-amount'>Amount</p>
                    </div>
                    <div className="checkout-button-cartmini">
                        <button>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
