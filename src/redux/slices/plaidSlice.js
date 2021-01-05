import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    transactions: {
        accounts: [],
        transactions: []
    },
    selectedAccount: "all",
    status: "idle",
    error: null
}

export const getTransactions = createAsyncThunk("plaid/getTransactions", async () => {
    const response = await axios.post("/api/plaid/transactions")
    return response.data
})

export const plaidSlice = createSlice({
    name: "plaid",
    initialState,
    reducers: {
        changeSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload
        }
    },
    extraReducers: {
        [getTransactions.fulfilled]: (state, action) => {
            state.transactions = action.payload
            state.status = "success"
        },
        [getTransactions.pending]: state => {
            state.status = "pending"
        },
        [getTransactions.rejected]: (state, action) => {
            state.error = action.error
            state.status = "failed"
        }
    }
})

export default plaidSlice.reducer
export const { changeSelectedAccount } = plaidSlice.actions

export const transactionsFilteredSelector = createSelector(
    [state => state.plaid.transactions, state => state.plaid.selectedAccount],
    ({transactions}, selectedAccount) => {
        return selectedAccount === "all" ? transactions
        : transactions.filter(({account_id}) => account_id === selectedAccount)
    }
)