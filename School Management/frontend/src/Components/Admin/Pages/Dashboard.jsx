import React from 'react'
import LogoutButton from '../../SmallComponents/LogoutButton'
import SideBar from '../Components/SideBar'

const Dashboard = () => {
    return (
        <div>
            <SideBar />
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
            <LogoutButton />
        </div>
    )
}

export default Dashboard