import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Admin/auth";
import teacherReducer from "./Slices/Admin/teacher";
import noticeReducer from "./Slices/Admin/notice";
import studentReducer from './Slices/Admin/student'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminTeacher: teacherReducer,
        adminNotice: noticeReducer,
        adminStudent: studentReducer
    }
})

export default store