import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig, getErrorMessage } from "../../../Helper";

const initialState = {
    allNotices: [],
    isLoading: false,
    isError: null,
    successMessage: null,
    singleNotice: null
}

export const getAllNotices = createAsyncThunk('notice/getAllNotice', async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/notice")
        return response.data.notices
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const addNotice = createAsyncThunk('notice/addNotice', async (content, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/notice", content, getConfig())
        return response.data.message
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const deleteNotice = createAsyncThunk('notice/deleteNotice', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/notice/${id}`, getConfig())
        return id
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const getsingleNotice = createAsyncThunk('notice/singleNotice', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/notice/${id}`)
        return response.data.notice
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const updateNotice = createAsyncThunk('notice/updateNotice', async ({ id, content }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/notice/${id}`, { content: content }, getConfig())
        return id
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

const noticeSlice = createSlice({
    name: "adminNotice",
    initialState,
    reducers: {
        resetSingleNotice: (state) => {
            state.singleNotice = null;
        },
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

        // for adding the notice
        builder
            .addCase(addNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(addNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload
            })
            .addCase(addNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })

        // for delete the notice
        builder
            .addCase(deleteNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(deleteNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allNotices = state.allNotices.filter((notice) => notice._id !== action.payload)
            })
            .addCase(deleteNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })

        builder
            .addCase(getsingleNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(getsingleNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleNotice = action.payload
            })
            .addCase(getsingleNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })

        builder
            .addCase(updateNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(updateNotice.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
    }
})

export const { resetSingleNotice } = noticeSlice.actions
export default noticeSlice.reducer