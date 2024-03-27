import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import "../styles/cartShowComponent.css";

export default function CartShowComponent() {
    const currentCart = useSelector(state => state.cart.currentCart);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (currentCart && currentCart.products) {
            fetchProductDetails(currentCart.products);
        }
    }, [currentCart]);

    const fetchProductDetails = async (products) => {
        const storage = getStorage();
        const updatedCartItems = [];

        for (const product of products) {
            const productDetails = await getProductDetailsFromFirebase(product.productId);
            updatedCartItems.push({
                ...product,
                ...productDetails
            });
        }

        setCartItems(updatedCartItems);
    };

    const getProductDetailsFromFirebase = async (productId) => {
        // Fetch product details from Firebase based on productId
        // Replace this with your actual Firebase database reference and fetching logic
        // For example:
        // const productRef = ref(storage, `products/${productId}`);
        // const productSnapshot = await getDownloadURL(productRef);
        // const productData = await productSnapshot.val();
        // return productData;

        // Mocked product details for demonstration
        return {
            photo: 'product_photo.jpg',
            price: 10, // Example price
            name: 'Product Name',
            size: 'S'
        };
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
                            <img src={item.photo} alt={item.name} />
                            <p>Name: {item.name}</p>
                            <p>Price: {item.price}</p>
                            <p>Size: {item.size}</p>
                            <p>Quantity: {item.productQuantity}</p>
                        </div>
                    ))}
                </div>
                <div className="cartmini-footer">
                    <div className="cartmini-sum">
                        <p className='title-sum'>Subtotal:</p>
                        <p className='cartmini-amount'>Amount</p>
                    </div>
                    <div className="checkout-button-cartmini">
                        <button>checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
