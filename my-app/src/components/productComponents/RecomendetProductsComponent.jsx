import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, updateDoc, limit } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage, deleteObject } from "firebase/storage";
import { Link } from 'react-router-dom';
import '../../styles/productComponentStyles/RecomendetProductsComponent.css';
import app from '../../config/firebase.js';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const RecomendetProductsComponent = ({ response }) => { // Accept response as a prop
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let categoryArray;
                let productLimit;
                switch (response) {
                    case 'men':
                        categoryArray = categoriesMen;
                        productLimit = [4, 3, 3, 1]; // Limit of products for each category
                        break;
                    case 'women':
                        categoryArray = categoriesWomen;
                        productLimit = [4, 3, 3, 1]; // You can adjust the limits accordingly
                        break;
                    case 'accessories':
                        categoryArray = categoriesAccessories;
                        productLimit = [4, 3, 3, 1];
                        break;
                    case 'decor':
                        categoryArray = categoriesDecor;
                        productLimit = [4, 3, 3, 1];
                        break;
                    default:
                        categoryArray = categories; // Default to all categories
                        productLimit = [4, 3, 3, 1];
                }

                let totalProducts = 0;
                let selectedProducts = [];

                for (let i = 0; i < categoryArray.length && totalProducts < 10; i++) {
                    const randomCategory = categoryArray[i];
                    setSelectedCategory(randomCategory);

                    const productsRef = collection(firestoreDB, 'Products');
                    const remainingLimit = 10 - totalProducts;
                    const productQuery = query(productsRef, where('Category', '==', randomCategory), limit(Math.min(productLimit[i], remainingLimit)));

                    const querySnapshot = await getDocs(productQuery);
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
                    selectedProducts = selectedProducts.concat(resolvedProducts);
                    totalProducts += resolvedProducts.length;
                }

                // Shuffle selected products
                shuffleArray(selectedProducts);
                setProducts(selectedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [response]); 

    // Function to shuffle array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const categories = [
        "men-geta",
        "men-hoodie",
        "men-jackets",
        "men-kimono",
        "men-shirt",
        "women-dress",
        "women-kimono",
        "women-pijamas",
        "decor-neko",
        "decor-noren",
        "decor-stationery",
        "decor-wallart",
        "accessories-obibelts",
        "accessories-fans",
        "accessories-masks",
        "accessories-umbrellas"
    ];

    const categoriesMen = [
        "men-geta",
        "men-hoodie",
        "men-jackets",
        "men-kimono",
        "men-shirt"
    ];

    const categoriesWomen = [
        "women-dress",
        "women-kimono",
        "women-pijamas"
    ];

    const categoriesAccessories = [
        "accessories-obibelts",
        "accessories-fans",
        "accessories-masks",
        "accessories-umbrellas"
    ];

    const categoriesDecor = [
        "decor-neko",
        "decor-noren",
        "decor-stationery",
        "decor-wallart"
    ];

    return (
        <div className='product-recommend-container-products'>
            <div className='container-recomend'>
                {products.map(product => (
                    <Link className='link-style' to={`/products/ns/${product.id}`}>
                    <div className={`product-container ${product.soldOut ? 'sold-out' : ''}`} key={product.id}>
                        <div className='item-recomend'>
                            <img src={product.imageUrl} alt={product.name} />
                            {product.soldOut === 1 && <div className="sold-out-overlay">Sold Out</div>}
                            <div className="product-item-title">{product.name}</div>
                            <div className="product-item-price">${product.price}.00</div>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    );
};

export default RecomendetProductsComponent;
