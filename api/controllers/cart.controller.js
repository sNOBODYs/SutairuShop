import Cart from "../models/cart.model.js";
import app from '../config/firebase.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


export const addCart = async (req, res, next) => {

    const { products, userId } = req.body;

    const existingCart = await Cart.findOne({ userId, state: 1 });
    if (existingCart) {
        return res.status(400).json({ success: false, message: "Already existing cart." });
    }
    createNewCart(products, userId);
    res.status(201).json({ message: "Cart created successfully" });
};

export const getCart = async (req, res, next) => {

    const { userId } = req.params;

    try {
        const existingCart = await Cart.findOne({ userId, state: 0 });

        if (!existingCart) {
            createNewCart([], userId);
        }
        const firestoreDB = getFirestore(app);
        const productIds = existingCart.products.map(product => product.productId);
        const querySnapshot = await getDocs(
            query(
                collection(firestoreDB, 'Products'),
            )
        );
        const cartWithProductDetails = [];
        querySnapshot.forEach(doc => {
            const cartProduct = existingCart.products.find(product => product.productId === doc.id);
            if (cartProduct) {
                cartWithProductDetails.push({
                    productId: doc.id,
                    productQuantity: cartProduct.productQuantity,
                    productName: doc.data().productName,
                    productImage: doc.data().productImage,
                    productPrice: doc.data().productPrice
                });
            }
        });


        res.status(200).json({ success: true, cart: cartWithProductDetails });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {

     if (req.user.id !== req.params.id) {
         return next(errorHandler(401, 'You can update only your account!'));
     }
    try {
        const { productId, productQuantity } = req.body;
        const userId = req.params.userId;
        const existingCart = await Cart.findOne({ userId, state: 0 });
        if (!existingCart) {
            createNewCart([{productId, productQuantity}], userId);
        }
        const productIndex = existingCart.products.findIndex(product => product.productId === productId);

        if (productIndex === -1) {
            existingCart.products.addToSet({ productId, productQuantity });
        }
        else if (productQuantity === 0) {
            existingCart.products.splice(productIndex, 1);
        } else {
            existingCart.products[productIndex].productQuantity = productQuantity;
        }

        const updatedCart = await existingCart.save();

        res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
        next(error);
    }
};



async function createNewCart (products, userId){
    const newCart = new Cart({ products, userId, state: 0 });
    try {
        await newCart.save();
    } catch (error) {
        next(error);
    }
}