import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoginPage from '../Pages/loginpage';
import Dashboard from '../Pages/Dashboard';

const AdminRouting = () => {

    const { user } = useSelector((state) => state.auth);

    return (
        <Router>
            <Routes>
                <Route path="/adminlogin" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={user.role === "admin" ? <Dashboard /> : <Navigate to="/adminlogin" replace />}
                />
            </Routes>
        </Router>
    )
}

export default AdminRouting