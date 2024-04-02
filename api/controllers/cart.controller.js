import Cart from "../models/cart.model.js";
import { errorHandler } from "../utils/error.js";
import app from '../config/firebase.js';
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';


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
            res.status(200).json({ success: true, cart: { products: [] } });
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
                    productSize: cartProduct.productSize, 
                    productName: doc.data().productName,
                    productImage: doc.data().productImage,
                    productPrice: doc.data().productPrice
                });
            }
        });


        res.status(200).json({ success: true, cart: { products: cartWithProductDetails } });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
   if (req.user.id !== req.params.userId) {
       return next(errorHandler(401, 'You can update only your account!'));
   }
    try {
        const { productId, productQuantity, productSize, productName, productImage, productPrice } = req.body;
        const userId = req.params.userId;
        const existingCart = await Cart.findOne({ userId, state: 0 });
        if (!existingCart) {
            createNewCart([], userId);
            return res.status(200).json({ success: true, cart: { products: [] } });
        }
        const productIndex = existingCart.products.findIndex(product => product.productId === productId);
        if (productIndex === -1) {
            existingCart.products.addToSet({ 
                productId,
                productName,
                productImage,
                productPrice,
                productQuantity,
                productSize});
        }
        else if (productQuantity === 0) {
            existingCart.products.splice(productIndex, 1);
        } else {
            existingCart.products[productIndex].productQuantity = productQuantity;
            existingCart.products[productIndex].productSize = productSize;
            existingCart.products[productIndex].productName = productName;
            existingCart.products[productIndex].productImage = productImage;
            existingCart.products[productIndex].productPrice = productPrice;
        }

        const updatedCart = await existingCart.save();
        res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
        next(error);
    }
};



async function createNewCart(products, userId) {
    const newCart = new Cart({
        products: products,
        userId: userId,
        state: 0
    });
    try {
        await newCart.save();
    } catch (error) {
        next(error);
    }
}