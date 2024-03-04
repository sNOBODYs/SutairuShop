import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseConfig from '../config/firebase.js';

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

const ProductComponent = ({ category }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(firestoreDB, 'Products'); 
          const q = query(productsRef, where('Category', '==', category));
          const querySnapshot = await getDocs(q); 
          const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [category]);
  
    return (
      <div>
        <h2>{category} Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>{product.name}</div>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductComponent;