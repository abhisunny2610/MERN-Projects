import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Admin/auth";
import teacherReducer from "./Slices/Admin/teacher";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminTeacher: teacherReducer
    }
})

export default store