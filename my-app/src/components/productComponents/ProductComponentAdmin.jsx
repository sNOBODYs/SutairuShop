import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage, deleteObject } from "firebase/storage";
import { Link } from 'react-router-dom';
import '../../styles/productComponentStyles/ProductComponentAdmin.css';
import app from '../../config/firebase.js';
import FooterComponent from '../FooterComponent.jsx';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductComponentAdmin = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = collection(firestoreDB, 'Products');
                let productQuery = query(productsRef);
                if (selectedCategory) {
                    productQuery = query(productsRef, where('Category', '==', selectedCategory));
                }
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
                const sortedProducts = sortProducts(resolvedProducts, sortOption);
                setProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategory, sortOption]);

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
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const handleRemoveProduct = async (productId, productImage) => {
        const confirmation = window.confirm("Are you sure you want to delete this product?");
        if (!confirmation) return;

        try {
            await deleteDoc(doc(firestoreDB, 'Products', productId));

            // Delete image from Firebase Storage
            const imageRef = ref(storage, productImage);
            await deleteObject(imageRef);

            // Update the state to remove the deleted product
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    const handleSoldOutProduct = async (productId) => {
        const confirmation = window.confirm("Are you sure you want to mark this product as sold out?");
        if (!confirmation) return;
    
        try {
            // Update the product document in Firestore to mark it as sold out
            const productRef = doc(firestoreDB, 'Products', productId);
            await updateDoc(productRef, {
                soldOut: 1
            });
    
            // Update the state to reflect the change
            setProducts(products.map(product => {
                if (product.id === productId) {
                    return { ...product, soldOut: 1 };
                }
                return product;
            }));
        } catch (error) {
            console.error('Error marking product as sold out:', error);
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

    return (
        <div>
            <div className="select-container">
                <select className='sort-select' value={sortOption} onChange={handleSortChange}>
                    <option value="default">Sort by...</option>
                    <option value="alphabeticalAsc">Alphabetically A-Z</option>
                    <option value="alphabeticalDesc">Alphabetically Z-A</option>
                    <option value="priceLowToHigh">Price, low to high</option>
                    <option value="priceHighToLow">Price, high to low</option>
                </select>
                <select className='category-select' value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <Link to="/dashboard/admin/add-product">
                    <button className='add-product'>Add a product</button>
                </Link>
            </div>
            <div className='container'>
                {products.map(product => (
                    <div className={`product-container ${product.soldOut ? 'sold-out' : ''}`} key={product.id}>
                        <div className='item'>
                            <img src={product.imageUrl} alt={product.name} />
                            {product.soldOut === 1 && <div className="sold-out-overlay">Sold Out</div>}
                            <div className="product-item-title">{product.name}</div>
                            <div className="product-item-price">${product.price}.00</div>
                            <div className="buttons-container">
                                <div className="button-container-admin">
                                    <Link to={`/dashboard/admin/edit-product/${product.id}`}>
                                        <button className='edit-button-admin'>Edit</button>
                                    </Link>
                                    {product.soldOut === 1 ? 
                                    <button disabled className='sold-button-admin' onClick={() => handleSoldOutProduct(product.id)}>Sold Out</button>
                                    :
                                     <button className='sold-button-admin' onClick={() => handleSoldOutProduct(product.id)}>Sold Out</button>}
                                    <button className='remove-button-admin' onClick={() => handleRemoveProduct(product.id, product.imageUrl)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <FooterComponent/>
        </div>
    );
};

export default ProductComponentAdmin;
