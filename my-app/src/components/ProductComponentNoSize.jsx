import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { Link } from 'react-router-dom';
import '../styles/ProductComponent.css';
import app from '../config/firebase.js';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductComponent = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(() => {
      return localStorage.getItem('sortOption') || 'default';
  });

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
                      imageUrl,
                      soldOut: data.soldOut || 0
                  };
              });
              const resolvedProducts = await Promise.all(productsData);

              const sortedProducts = sortProducts(resolvedProducts, sortOption);

              setProducts(sortedProducts);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };

      fetchProducts();
  }, [category, sortOption]);

  const sortProducts = (productsArray, option) => {
      let sortedProductsCopy = [...productsArray];

      switch (option) {
          case 'alphabeticalAsc':
              sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
              break;
          case 'alphabeticalDesc':
              sortedProductsCopy.sort((a, b) => b.name.localeCompare(a.name));
              break;
          case 'priceLowToHigh':
              sortedProductsCopy.sort((a, b) => a.price - b.price);
              break;
          case 'priceHighToLow':
              sortedProductsCopy.sort((a, b) => b.price - a.price);
              break;
          default:
              break;
      }

      return sortedProductsCopy;
  };

  const handleSortChange = (e) => {
      const option = e.target.value;
      setSortOption(option);
      localStorage.setItem('sortOption', option); 
  };

  return (
      <div>
          <div className="select-container">
              <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Sort by...</option>
                  <option value="alphabeticalAsc">Alphabetically A-Z</option>
                  <option value="alphabeticalDesc">Alphabetically Z-A</option>
                  <option value="priceLowToHigh">Price, low to high</option>
                  <option value="priceHighToLow">Price, high to low</option>
              </select>
          </div>
          <div className='container'>
              {products.map(product => (
                  <div className={`product-container ${product.soldOut ? 'sold-out' : ''}`} key={product.id}>
                      <Link className='link-style' to={`/products/ns/${product.id}`}>
                          <div className='item'>
                              <img src={product.imageUrl} alt={product.name} />
                              {product.soldOut === 1 && <div className="sold-out-overlay">Sold Out</div>}
                              <div className="product-item-title">{product.name}</div>
                              <div className="product-item-price">${product.price}.00</div>
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default ProductComponent;