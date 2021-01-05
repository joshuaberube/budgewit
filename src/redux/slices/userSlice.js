import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import history from "../../history"
import axios from 'axios'

const initialState = {
    isLoggingIn : true,
    isLoggedIn: false,
    user: {},
    error: null
}

export const login = createAsyncThunk("user/login", async (userCredentials, thunkAPI) => {
    const {isLoggingIn} = thunkAPI.getState().user
    try {
        const user = await axios.post(`/api/user/${isLoggingIn ? "login" : "register"}`, userCredentials)
        history.push("/")
        return user.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.request.response)
    }
})

export const getUserSession = createAsyncThunk("user/getUserSession", async (_, thunkAPI) => {
    try {
        const user = await axios.post("/api/user/session")
        history.push("/")
        return user.data
    } catch (err) {
        history.push("/auth")
        return thunkAPI.rejectWithValue(err.response.request.response)
    }
})

export const logout = createAsyncThunk("user/logout", async () => {
    await axios.post("/api/user/logout")
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeIsLoggingIn: state => {
            state.isLoggingIn = !state.isLoggingIn
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload
        },
        [logout.fulfilled]: () => initialState,
        [getUserSession.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [getUserSession.rejected]: () => initialState
    }
})

export const { changeIsLoggingIn } = userSlice.actions

export const selectUser = state => state.user.user
export const selectError = state => state.user.error
export const selectIsLoggingIn = state => state.user.isLoggingIn
export const selectIsLoggedIn = state => state.user.isLoggedIn
export const selectUserState = state => state.user

export default userSlice.reducer