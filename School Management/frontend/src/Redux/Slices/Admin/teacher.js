import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig, getErrorMessage } from "../../../Helper";

const initialState = {
    teachers: [],
    singleTeacher: null,
    isLoading: false,
    error: null,
    updateSuceesMsg: ""
}

export const registerTeacher = createAsyncThunk('teachers/registerTeacher', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/teacher/register", credentials, getConfig())
        return response?.data
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
    'teachers/deleteTeacher',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/teacher/${id}`, getConfig());
            return id
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

export const updateTeacher = createAsyncThunk(
    "teachers/updateTeacher",
    async ({ id, credentials }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/teacher/${id}`, credentials, getConfig())
            return response.data.message
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

        // for update the tecaher
        builder
            .addCase(updateTeacher.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateSuceesMsg = action.payload
            })
            .addCase(updateTeacher.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            });
    }
})

export const { resetSingleTeacher } = teacherSlice.actions
export default teacherSlice.reducer