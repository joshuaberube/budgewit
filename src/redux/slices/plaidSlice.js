import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    transactions: [],
    error: null
}

export const createAccessToken = createAsyncThunk("plaid/createAccessToken", async publicToken => {
    const response = await axios.post("/api/plaid/create-access-token", { publicToken })
    return response.data
})

export const getTransactions = createAsyncThunk("plaid/getTransactions", async () => {
    const response = await axios.post("/api/plaid/transactions")
    return response.data
})

export const plaidSlice = createSlice({
    name: "plaid",
    initialState,
    extraReducers: {
        [createAccessToken.fulfilled]: (state, action) => {
            state.accessToken = action.payload
        },
        [createAccessToken.rejected]: (state, action) => {
            state.error = action.error
        },
        [getTransactions.fulfilled]: (state, action) => {
            state.transactions = action.payload
        },
        [getTransactions.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})

export default plaidSlice.reducer