import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import app from '../../config/firebase.js';
import FooterComponent from '../FooterComponent.jsx';

const firestoreDB = getFirestore(app);
const storage = getStorage();

const ProductDetailsEdit = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const imageInputRef = useRef();
    const navigate = useNavigate()

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
                        productId: docSnap.id,
                        name: data.productName,
                        price: data.productPrice,
                        description: data.productDescription,
                        imageUrl,
                        soldOut: data.soldOut || 0 // Initialize soldOut property with 0 if not present
                    });
                    setEditedProduct({ ...data });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: name === 'soldOut' ? parseInt(value) : value // Convert value to integer if the property is 'soldOut'
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProduct(prevState => ({
                ...prevState,
                imageUrl: imageUrl
            }));
        }
    };

    const saveEditedProduct = async (event) => {
        event.preventDefault();

        // Ask for confirmation before saving changes
        const confirmSave = window.confirm("Are you sure you want to save the changes?");
        if (!confirmSave) return; // Do nothing if user cancels

        setLoading(true);

        try {
            let updatedProduct = { ...editedProduct };

            if (image) {
                // Upload image to storage
                const storageRef = ref(storage, `products_edited_or_added/${productId}/${image.name}`);
                await uploadBytes(storageRef, image);
                // Update product image path
                const imagePath = `products_edited_or_added/${productId}/${image.name}`;
                updatedProduct.productImage = imagePath;
            }

            // Update product details in Firestore
            await updateDoc(doc(firestoreDB, 'Products', productId), updatedProduct);

            if (image) {
                // Get download URL for the new image
                const imageRef = ref(storage, updatedProduct.productImage);
                const imageUrl = await getDownloadURL(imageRef);
                // Set product state with updated image URL
                setProduct({ ...updatedProduct, imageUrl });
                setSuccessMessage('Product edited successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/dashboard/admin');
                }, 1500);
            } else {
                // If no image was uploaded, just update other details
                setProduct({ ...updatedProduct, imageUrl: product.imageUrl });
                setSuccessMessage('Product edited successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/dashboard/admin');
                }, 1500);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }

        setLoading(false);
    };

    if (!product) {
        return (
            <div className="loading-product-container">
                <div className='loading-product'>Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "50vh" }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                    <h2 className='text-center mb-4'>Product Edit</h2>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {/* Display product image */}
                    <div className="text-center mb-4">
                        <label htmlFor="product-image-edit">
                            <img src={product.imageUrl} alt={product.name} style={{ maxHeight: "300px", maxWidth: "100%", cursor: "pointer" }} />
                        </label>
                        <input type="file" id="product-image-edit" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
                    </div>
                    <Form onSubmit={saveEditedProduct}>
                        <Form.Group controlId='product-name-edit'>
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type='text' defaultValue={product.name} name='productName' onChange={handleEditChange} required />
                        </Form.Group>

                        <Form.Group controlId='product-price-edit'>
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type='number' defaultValue={product.price} name='productPrice' onChange={handleEditChange} required />
                        </Form.Group>

                        <Form.Group controlId='product-description-edit'>
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control type='text' defaultValue={product.description || 'Empty'} name='productDescription' onChange={handleEditChange} required />
                        </Form.Group>

                        <Form.Group controlId='product-sold-out-edit'>
                            <Form.Label>Product Sold Out</Form.Label>
                            <Form.Select defaultValue={product.soldOut} name='soldOut' onChange={handleEditChange} required>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </Form.Select>
                        </Form.Group>

                        <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Form>
                </div>
            </Container>
            <FooterComponent />
        </>
    );
}

export default ProductDetailsEdit;
