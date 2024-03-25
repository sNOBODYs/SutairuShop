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
        return <div>Loading...</div>;
    }

    return (
        <div className='product-details-container'>
            <img src={product.imageUrl} alt={product.name} />
            <div className='product-details'>
                <div className='product-name'>{product.name}</div>
                <div className='product-price'>${product.price}.00</div>
            </div>
        </div>
    );
};

export default ProductDetails;
