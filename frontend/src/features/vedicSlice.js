import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: null
}

export const vedicSlice=createSlice({
    name:"VedicVerse",
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        }
    }
})

export const {setUser}= vedicSlice.actions;

export default vedicSlice.reducer