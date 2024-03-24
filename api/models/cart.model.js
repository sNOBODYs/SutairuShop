import mongoose from "mongoose";


const cartProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,           // may be a problem
    },
    productQuantity: {
        type: Number,
        required: true,
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