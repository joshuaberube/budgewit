import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    accounts: [],
    transactions: [],
    categories: [],
    selectedAccount: "all",
    status: "idle",
    error: null
}

export const getTransactions = createAsyncThunk("plaid/getTransactions", async () => {
    const {data: {transactions, accounts}} = await axios.post("/api/plaid/transactions")
    const {data: categories} = await axios.get("/api/plaid/categories")

    return {transactions, accounts, categories}
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
            state.transactions = action.payload.transactions
            state.accounts = action.payload.accounts
            state.categories = action.payload.categories
            state.status = "success"
        },
        [getTransactions.pending]: state => {
            state.status = "pending"
        },
        [getTransactions.rejected]: (state, action) => {
            state.error = action.error.message
            state.status = "failed"
        }
    }
})

export default plaidSlice.reducer
export const { changeSelectedAccount } = plaidSlice.actions

export const transactionsFilteredSelector = createSelector(
    [state => state.plaid.transactions, state => state.plaid.selectedAccount],
    (transactions, selectedAccount) => (
        selectedAccount === "all" ? transactions
        : transactions.filter(({account_id}) => account_id === selectedAccount)
    )
)

export const categoriesFilteredSelector = createSelector(
    [state => state.plaid.categories, state => state.plaid.transactions],
    (categories, transactions) => {
        return categories.filter(({hierarchy}) => {
            return transactions.some(({category}) => {
                return category.toString() === hierarchy.toString()
            })
        })
    }
)