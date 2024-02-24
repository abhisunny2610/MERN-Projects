import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Redux/Slices/Admin/auth'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <button onClick={handleLogout} style={{color: "red"}}>Logout</button>
  )
}

export default LogoutButton