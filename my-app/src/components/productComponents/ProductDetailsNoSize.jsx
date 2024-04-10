import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { useSelector } from 'react-redux';
import '../../styles/productComponentStyles/ProductDetailsNoSize.css';
import app from '../../config/firebase.js';
import { useNavigate } from 'react-router-dom';
import { updateCartFailure, updateCartStart, updateCartSuccess } from '../../redux/cart/cartSlice.js';
import { useDispatch } from 'react-redux';
import CartShowComponent from '../cartShowComponent.jsx';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('S');
    const { currentUser, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(firestoreDB, 'Products', productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const imagePath = data.productImage;
                    const imageRef = ref(storage, imagePath);
                    const imageUrl = await getDownloadURL(imageRef);
                    setProduct({
                        productId: docSnap.productId,
                        name: data.productName,
                        price: data.productPrice,
                        description: data.productDescription,
                        imageUrl,
                        soldOut: data.soldOut || 0
                    });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = async() => {
        if (product.soldOut === 1) {
            
            return;
        }
        try {
            const formData = {
                productId: productId,
                productQuantity: quantity,
                productName: product.name,
                productImage: product.imageUrl,
                productPrice: product.price
            };
            dispatch(updateCartStart());
            const res = await fetch(`http://localhost:3000/api/cart/update/${currentUser._id}`, {
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
            setIsCartOpen(true);
          } catch (error) {
            console.log(error);
          }
    };


    if (!product) {
        return (
            <div className="loading-product-container">
                <div className='loading-product'>Loading...</div>
            </div>);
    }

    return (
        <div className='product-details-container'>
        <div className='product-details-container'>
            <div className="product-container-small">
                <div className='image-container'>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className='details-container'>
                    <div className='product-details'>
                        <h1 className='product-name'>{product.name}</h1>
                        <div className='product-price'>${product.price}.00</div>
                        <div className="choosing">
                            <div className="quantity-choosing-ns">
                                <p>Quantity</p>
                                <input type="number" value={quantity} onChange={handleQuantityChange} min="1"/>
                            </div>
                        </div>
                        {product.soldOut === 1 ? (
                            // Render a disabled button if sold out
                            <button className='add-to-cart' disabled style={{ opacity: 0.5 }}>
                                Sold Out
                            </button>
                        ) : (
                            // Render the regular add to cart button
                            <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
                        )}
                        <div className="product-description">
                            <h5>Description</h5>
                            {product.description ? (
                                <p>{product.description}</p>
                            ) : (
                                <p>No description for now...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CartShowComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default ProductDetails;
