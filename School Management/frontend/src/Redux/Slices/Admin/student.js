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
        return response.data.message
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

// for delete the student
export const deleteStudent = createAsyncThunk("student/deleteStudent", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/student/${id}`, getConfig())
        return id
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

// for fetching single student details
export const singleStudent = createAsyncThunk("student/singleStudent", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/student/${id}`, getConfig())
        return response.data.student
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

const initialState = {
    students: [],
    isLoading: false,
    isError: null,
    singleLoading: false,
    singleStudent: null
}

const studentSlice = createSlice({
    name: "adminStudent",
    initialState,
    reducers: {
        resetSingleStudent : (state) => {
            state.singleStudent = null
        }
    },
    extraReducers: (builder) => {
        // for fetching all the students
        builder
            .addCase(fetchAllStudents.pending, (state) => {
                state.isError = null;
                state.isLoading = true
            })
            .addCase(fetchAllStudents.fulfilled, (state, action) => {
                state.isLoading = false;
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
                state.isError = action.payload
            })

        // for delete the student
        builder
            .addCase(deleteStudent.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = state.students.filter((student) => student._id !== action.payload)
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })

        // for fetching the single student data
        builder
            .addCase(singleStudent.pending, (state) => {
                state.singleLoading = true;
                state.isError = null
            })
            .addCase(singleStudent.fulfilled, (state, action) => {
                state.singleLoading = false;
                state.singleStudent = action.payload
            })
            .addCase(singleStudent.rejected, (state, action) => {
                state.singleLoading = false;
                state.isError = action.payload
            })
    }
})

export const {resetSingleStudent} = studentSlice.actions
export default studentSlice.reducer
