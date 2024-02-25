import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig, getErrorMessage } from "../../../Helper";

const initialState = {
    allNotices: [],
    isLoading: false,
    isError: null
}

export const getAllNotices = createAsyncThunk('notice/getAllNotice', async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/notice")
        return response.data.notices
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

const noticeSlice = createSlice({
    name: "adminNotice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // for fetching all the notices
        builder
            .addCase(getAllNotices.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(getAllNotices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allNotices = [...action.payload];
            })
            .addCase(getAllNotices.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
    }
})

export default noticeSlice.reducer