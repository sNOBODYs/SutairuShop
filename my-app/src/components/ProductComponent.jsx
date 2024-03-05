import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseConfig from '../config/firebase.js';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import '../styles/ProductComponent.css';

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductComponent = ({ category }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(firestoreDB, 'Products'); 
          const q = query(productsRef, where('Category', '==', category));
          const querySnapshot = await getDocs(q); 
          const productsData = querySnapshot.docs.map(async doc => {
            const data = doc.data();
            const imagePath = data.productImage; 
            const imageRef = ref(storage, imagePath);
            const imageUrl = await getDownloadURL(imageRef);
            return { 
              id: doc.id,
              name: data.productName, 
              price: data.productPrice,
              imageUrl 
            };
          });
          const resolvedProducts = await Promise.all(productsData);
          setProducts(resolvedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [category]);
  
    return (
      <div>
        <div className='container'>
          {products.map(product => (
            <div key={product.id}>
              <div className='item'>
              <img src={product.imageUrl} alt={product.name} />
              <div className="hearth-icon">
                <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
              </div>
              <div className="product-item-title">{product.name}</div>
              <div className="product-item-price">${product.price}</div>
               </div>
               </div>
          ))}
        </div>
      </div>
    );
};

export default ProductComponent;
