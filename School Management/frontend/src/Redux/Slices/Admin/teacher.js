import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "../../../Helper";

const initialState = {
    teachers: [],
    singleTeacher: null,
    isLoading: false,
    error: null,
}

export const getAllTeachers = createAsyncThunk('teachers/getAllTeacher', async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/teacher", getConfig())
        return response.data.teachers
    } catch (error) {
        if (!error.response) {
            // Network error
            throw error;
        }
        // Server error
        return rejectWithValue(error.response.data);
    }
})

export const getSingleTeacher = createAsyncThunk(
    'teachers/getSingleTeacher',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/teacher/${id}`, getConfig());
            return response.data.teacher;
        } catch (error) {
            console.error('Error getting single teacher:', error);
            if (error.response) {
                // Server responded with a status code outside the range of 2xx
                console.log('Server error response:', error.response.data);
                return rejectWithValue(error.response.data.message || 'Server Error');
            } else {
                // Network error or request was aborted
                console.error('Network error:', error.message);
                return rejectWithValue('Network Error');
            }
        }
    }
);

const teacherSlice = createSlice({
    name: "adminTeacher",
    initialState,
    reducers: {
        resetSingleTeacher: (state) => {
            state.singleTeacher = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeachers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllTeachers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teachers.push(action.payload);
            })
            .addCase(getAllTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.message : action.error.message;
            })

        builder
            .addCase(getSingleTeacher.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSingleTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleTeacher = action.payload
            })
            .addCase(getSingleTeacher.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    }
})

export const {resetSingleTeacher} = teacherSlice.actions
export default teacherSlice.reducer