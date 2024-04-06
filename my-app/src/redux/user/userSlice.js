import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    resetPasswordLoading: false,
    resetPasswordError: false,
    resetPasswordEmail: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordStart: (state) => {
            state.resetPasswordLoading = true;
            state.resetPasswordError = false;
        },
        resetPasswordSuccess: (state, action) => {
            state.resetPasswordLoading = false;
            state.resetPasswordError = false;
            state.resetPasswordEmail = action.payload;
        },   
        resetPasswordFailure: (state, action) => {
            state.resetPasswordLoading = false;
            state.resetPasswordError = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    }
});

export const { 
    signUpSuccess,
    signUpFailure,
    signUpStart,
    signOut,
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserSuccess,
    updateUserStart,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure } = userSlice.actions;

export default userSlice.reducer;
