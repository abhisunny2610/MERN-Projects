import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Admin/auth";
import teacherReducer from "./Slices/Admin/teacher";
import noticeReducer from "./Slices/Admin/notice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminTeacher: teacherReducer,
        adminNotice: noticeReducer,
    }
})

export default store