import { configureStore } from "@reduxjs/toolkit";
import vedicReducer from "../features/vedicSlice.js"

const store=configureStore({
    reducer: vedicReducer
})

export default store;