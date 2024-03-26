import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import '../styles/ProductDetails.css';
import app from '../config/firebase.js';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

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
                        imageUrl
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

    if (!product) {
        return(
        <div className="loading-product-container">
        <div className='loading-product'>Loading...</div>
        </div>);
    }

    return (
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
                            <div className="size-choose">
                                <p>Size</p>
                                <select>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>XXL</option>
                                </select>
                            </div>
                            <div className="quantity-choosing">
                                <p>Quantity</p>
                                <input type="number" value="1" />
                            </div>
                        </div>
                        <button className='add-to-cart'>Add to Cart</button>
                        <div className="product-description">
                            <h5>Description</h5>
                            {product.description? (
                                <p>{product.description}</p>
                            ):(
                                <p>No description for now...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
