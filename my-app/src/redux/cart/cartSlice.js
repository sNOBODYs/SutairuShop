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
        },
        deleteCartStart: (state) => {
            state.loading = true;
        },
        deleteCartSuccess: (state, action) => {
            state.currentCart = action.payload;
            state.loading = false;
            state.error = false;
        },
        deleteCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutCart: (state) => {
            state.currentCart = null;
            state.loading = false;
            state.error = false;
        }
    }
});
export const { 
    updateCartStart,
    updateCartSuccess,
    updateCartFailure,
    getCartStart,
    getCartSuccess,
    getCartFailure,
    signOutCart,
    deleteCartStart,
    deleteCartFailure,
    deleteCartSuccess } = cartSlice.actions;
export default cartSlice.reducer;