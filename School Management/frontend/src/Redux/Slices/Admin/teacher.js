import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig, getErrorMessage } from "../../../Helper";

const initialState = {
    teachers: [],
    singleTeacher: null,
    isLoading: false,
    error: null,
    registrationSuccess: null
}

export const registerTeacher = createAsyncThunk('teacher/registerTeacher', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/teacher/register", credentials, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("Register teacher", response)
        return response.data
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const getAllTeachers = createAsyncThunk('teachers/getAllTeacher', async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/teacher", getConfig())
        return response.data.teachers
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const getSingleTeacher = createAsyncThunk(
    'teachers/getSingleTeacher',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/teacher/${id}`, getConfig());
            return response.data.teacher;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
);

export const deleteTeacher = createAsyncThunk(
    'teacher/deleteTeacher',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/teacher/${id}`, getConfig());
            return id
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

const teacherSlice = createSlice({
    name: "adminTeacher",
    initialState,
    reducers: {
        resetSingleTeacher: (state) => {
            state.singleTeacher = null;
        },
    },
    extraReducers: (builder) => {

        // for register teacher
        builder
            .addCase(registerTeacher.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.registrationSuccess = action.payload
            })
            .addCase(registerTeacher.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

        // for fetching all teachers list
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
                state.error = action.payload
            })

        // for get single teacher details
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
                state.error = action.payload
            });

        // for delete the user
        builder
            .addCase(deleteTeacher.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teachers = state.teachers.filter((teacher) => teacher._id !== action.payload)
            })
            .addCase(deleteTeacher.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            });
    }
})

export const { resetSingleTeacher } = teacherSlice.actions
export default teacherSlice.reducer