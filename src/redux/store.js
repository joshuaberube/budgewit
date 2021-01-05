import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import plaidReducer from "./slices/plaidSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        plaid: plaidReducer
    }
})