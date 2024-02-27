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

// for register new student
export const registerStudent = createAsyncThunk("student/registerStudent", async (credential, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/student/register", credential, getConfig())
        console.log("----", response.data.message)
        return response.data.message
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
    extraReducers: (builder) => {
        // for fetching all the students
        builder
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

        // for register new student
        builder
            .addCase(registerStudent.pending, (state) => {
                state.isError = null;
                state.isLoading = true
            })
            .addCase(registerStudent.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(registerStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export default studentSlice.reducer
