import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseConfig from '../config/firebase.js';
import { getDownloadURL, ref, getStorage } from "firebase/storage";

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
            const imagePath = data.productImage; // Corrected field name to productImage
            const imageRef = ref(storage, imagePath);
            const imageUrl = await getDownloadURL(imageRef);
            return { 
              id: doc.id,
              name: data.productName, // Corrected property name to productName
              price: data.productPrice, // Corrected property name to productPrice
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
        <h2>{category} Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div>{product.name}</div>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ProductComponent;
