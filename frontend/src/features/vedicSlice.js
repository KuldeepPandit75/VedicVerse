import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    gameLoading: false,
    shower: false,
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
        setGameLoading(state,action){
            state.gameLoading=action.payload;
        },
        setShower(state,action){
            state.shower=action.payload;
        }
    },
});

export const { setUser, logout, setGameLoading, setShower } = vedicSlice.actions;

export default vedicSlice.reducer;