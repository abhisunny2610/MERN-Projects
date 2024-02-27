import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoginPage from '../Pages/loginpage';
import Dashboard from '../Pages/Dashboard';
import AllTeachers from '../Pages/AllTeachers';
import AddTeacher from '../Pages/AddTeacher';
import UpdateTeacher from '../Pages/UpdateTeacher';
import AllNotices from '../Pages/AllNotices';
import AddNotice from '../Pages/AddNotice';
import Calendar from '../Pages/Calander';
import AllStudent from '../Pages/AllStudent';
import AddStudent from '../Pages/AddStudent';

const AdminRouting = () => {

    const { user } = useSelector((state) => state.auth);

    return (
            <Routes>
                <Route path="/adminlogin" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={(user && user.role === "admin") ? <Dashboard /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/teachers"
                    element={(user && user.role === "admin") ? <AllTeachers /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/addteacher"
                    element={(user && user.role === "admin") ? <AddTeacher /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/updateteacher/:id"
                    element={(user && user.role === "admin") ? <UpdateTeacher /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/notices"
                    element={(user && user.role === "admin") ? <AllNotices /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/addnotice"
                    element={(user && user.role === "admin") ? <AddNotice /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/calendar"
                    element={(user && user.role === "admin") ? <Calendar /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/students"
                    element={(user && user.role === "admin") ? <AllStudent /> : <Navigate to="/adminlogin" replace />}
                />
                <Route
                    path="/addstudent"
                    element={(user && user.role === "admin") ? <AddStudent /> : <Navigate to="/adminlogin" replace />}
                />
            </Routes>
    )
}

export default AdminRouting