import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoginPage from '../Pages/loginpage';
import Dashboard from '../Pages/Dashboard';
import AllTeachers from '../Pages/AllTeachers';
import AddTeacher from '../Pages/AddTeacher';
import UpdateTeacher from '../Pages/UpdateTeacher';

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
            </Routes>
    )
}

export default AdminRouting