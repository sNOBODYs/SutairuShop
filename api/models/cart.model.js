import mongoose from "mongoose";


const cartProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: false,
    },
    productName: {
        type: String,
        required: true,
        unique: false,
    },
    productImage: {
        type: String,
        required: true,
        unique: false,
    },
    productPrice: {
        type: Number,
        required: true,
        unique: false,
    },
    productQuantity: {
        type: Number,
        required: true,
        unique: false,
    },
    productSize: {
        type: String,
        required: false,
        unique: false,
    }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
    products: [cartProductSchema],
    userId:{
        type: String,
        required: true,
        unique:false,
    },
    state:{
        type: Number,
        required: true,
        unique: false,
    }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;