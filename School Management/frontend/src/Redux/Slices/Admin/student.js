import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getConfig, getErrorMessage } from "../../../Helper";
import axios from "axios";

// for fetching all the data of students.
export const fetchAllStudents = createAsyncThunk("student/fetchAllStudents", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/student", getConfig())
        return response.data.students
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

const initialState = {
    students: [],
    isLoading: false,
    isError: null
}

const studentSlice = createSlice({
    name: "adminStudent",
    initialState,
    reducers: {

    },
    extraReducers: (bulider) => {
        // for fetching all the students
        bulider
            .addCase(fetchAllStudents.pending, (state) => {
                state.isError = null;
                state.isLoading = true
            })
            .addCase(fetchAllStudents.fulfilled, (state, action) => {
                state.isError = false;
                state.students = [...action.payload]
            })
            .addCase(fetchAllStudents.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false
            })
    }
})

export default studentSlice.reducer
