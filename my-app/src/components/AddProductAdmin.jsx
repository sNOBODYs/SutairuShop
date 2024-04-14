import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import app from '../config/firebase.js';
import FooterComponent from './FooterComponent.jsx';

const firestoreDB = getFirestore(app);
const storage = getStorage();

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

const AddProductAdmin = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        productImage: '',
        Category: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const imageInputRef = useRef();

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProduct(prevState => ({
                ...prevState,
                productImage: imageUrl
            }));
        }
    };

    const saveEditedProduct = async (event) => {
        event.preventDefault();
        
        const confirmSave = window.confirm("Are you sure you want to save the product?");
        if (!confirmSave) return;
        
        setLoading(true);
    
        try {
            let productData = { ...product };
            const productsCollection = collection(firestoreDB, 'Products');
            const querySnapshot = await getDocs(productsCollection);
            const latestProductId = "productID" + (querySnapshot.docs.length + 2);

            if (image) {
                const storageRef = ref(storage, `products_edited_or_added/${latestProductId}/${image.name}`);
                await uploadBytes(storageRef, image);
                const imagePath = `products_edited_or_added/${latestProductId}/${image.name}`;
                productData.productImage = imagePath;
            }

            await setDoc(doc(firestoreDB, 'Products', latestProductId), productData);

            if (image) {
                const imageRef = ref(storage, productData.productImage);
                await getDownloadURL(imageRef);
            }

            setLoading(false);
            setSuccessMessage('Product added successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard/admin');
            }, 1500);
        } catch (error) {
            console.error('Error adding product:', error);
            setLoading(false);
            setSuccessMessage('An error occurred while adding the product.');
        }
    };

    return (
        <>
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "50vh" }}>
            <div className='w-100' style={{ maxWidth: '500px' }}>
                <h2 className='text-center mb-4'>Add New Product</h2>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <div className="text-center mb-4">
                    <label htmlFor="product-image-edit">
                        <img src={product.productImage} alt={product.productName} style={{ maxHeight: "300px", maxWidth: "100%", cursor: "pointer" }} />
                    </label>
                    <input type="file" id="product-image-edit" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
                </div>
                <Form onSubmit={saveEditedProduct}>
                    <Form.Group controlId='product-name-edit'>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type='text' value={product.productName} name='productName' onChange={handleEditChange} required />
                    </Form.Group>
    
                    <Form.Group controlId='product-price-edit'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type='number' value={product.productPrice} name='productPrice' onChange={handleEditChange} required />
                    </Form.Group>
    
                    <Form.Group controlId='product-description-edit'>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control type='text' value={product.productDescription} name='productDescription' onChange={handleEditChange} required />
                    </Form.Group>

                    {/* Category Select */}
                    <Form.Group controlId="product-category-edit">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={product.Category} name='Category' onChange={handleEditChange} required>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Image Upload Section */}
                    <Form.Group controlId="product-image-edit">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
    
                    <Button disabled={loading} className='w-100 mt-3'style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>
                        {loading ? 'Saving...' : 'Save Product'}
                    </Button>
                </Form>
            </div>
        </Container>
        <FooterComponent/>
        </>
    );
}

export default AddProductAdmin;
