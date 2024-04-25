import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentHistory: null,
    loading: false,
    error: false,
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        updateHistorytStart: (state) => {
            state.loading = true;
        },
        updateHistorySuccess: (state, action) => {
            state.currentCart = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateHistoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getHistoryStart: (state) => {
            state.loading = true;
        },
        getHistorySuccess: (state, action) => {
            state.currentCart = action.payload;
            state.loading = false;
            state.error = false;
        },
        getHistoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutHistory: (state) => {
            state.currentCart = null;
            state.loading = false;
            state.error = false;
        }
    }
});
export const { 
    updateHistorytStart,
    updateHistorySuccess,
    updateHistoryFailure,
    getHistoryStart,
    getHistorySuccess,
    getHistoryFailure,
    signOutHistory } = historySlice.actions;
export default historySlice.reducer;