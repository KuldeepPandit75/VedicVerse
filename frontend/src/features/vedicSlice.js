import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    gameLoading: false,
    shower: false,
    talkGuru: false,
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
        },
        setTalk(state,action){
            state.talkGuru=action.payload
        },
        setRecMsgRedux(state, action) {
            state.recMsg.push(action.payload);
        },
    },
});

export const { setUser, logout, setGameLoading, setShower, setTalk, setRecMsgRedux } = vedicSlice.actions;

export default vedicSlice.reducer;