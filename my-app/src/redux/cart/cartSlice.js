import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCart: null,
    loading: false,
    error: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartStart: (state) => {
            state.loading = true;
        },
        updateCartSuccess: (state, action) => {
            state.currentCart = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCartStart: (state) => {
            state.loading = true;
        },
        getCartSuccess: (state, action) => {
            state.currentCart = action.payload;
            state.loading = false;
            state.error = false;
        },
        getCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
export const selectTotalQuantity = (state) => {
    const { currentCart } = state.cart;
    if (!currentCart || !currentCart.cart || !currentCart.cart.products) return 0;

    return currentCart.cart.products.reduce((total, product) => total + product.productQuantity, 0);
};
export const { 
    updateCartStart,
    updateCartSuccess,
    updateCartFailure,
    getCartStart,
    getCartSuccess,
    getCartFailure } = cartSlice.actions;
export default cartSlice.reducer;