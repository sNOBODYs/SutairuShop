import Cart from "../models/cart.model.js";
import pkg from '../../my-app/src/config/firebase.js';
const { auth } = pkg;

export const addCart = async (req, res, next) => {

    const { products, userId } = req.body;

    const existingCart = await Cart.findOne({ userId, state: 1 });
    if (existingCart) {
        return res.status(400).json({ success: false, message: "Already existing cart." });
    }
    const newCart = new Cart({ products, userId, state: 0 });
    try {
        await newCart.save();
        res.status(201).json({ message: "Cart created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {

    const { userId } = req.body;

    try {
        const existingCart = await Cart.findOne({ userId, state: 0 });

        if (!existingCart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        const firebaseProductsSnapshot = await firebase.database().ref('products').once('value');
        const firebaseProducts = firebaseProductsSnapshot.val();

        const cartWithProductDetails = existingCart.products.map(cartProduct => {
            const { productId, productQuantity } = cartProduct;
            const productDetails = firebaseProducts[productId];
            return {
                productId,
                productQuantity,
                productName: productDetails.productName,
                productImage: productDetails.productImage,
                productPrice: productDetails.productPrice
            };
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
        const userId = req.user.id;
        const existingCart = await Cart.findOne({ userId, state: 0 });
        if (!existingCart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }
        const productIndex = existingCart.products.findIndex(product => product.productId === productId);

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart." });
        }
        if (productQuantity === 0) {
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