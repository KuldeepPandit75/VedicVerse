import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
};

export const vedicSlice = createSlice({
    name: "vedic",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setUser, logout } = vedicSlice.actions;

export default vedicSlice.reducer;