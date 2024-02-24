import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: JSON.parse(localStorage.getItem('userData')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
}

export const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/user/login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userData', JSON.stringify(response.data.userData));
        return response.data
    } catch (error) {
        if (!error.response) {
            // Network error
            throw error;
        }
        // Server error
        return rejectWithValue(error.response.data);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem("userData")
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.userData;;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.message : action.error.message;
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer