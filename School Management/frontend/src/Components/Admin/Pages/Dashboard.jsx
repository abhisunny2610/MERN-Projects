import React, { useEffect } from 'react'
import LogoutButton from '../Components/LogoutButton'
import TotalCountCard from '../Components/TotalCountCard'
import { HStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotices } from '../../../Redux/Slices/Admin/notice'
import { getAllTeachers } from '../../../Redux/Slices/Admin/teacher'
import { fetchAllStudents } from '../../../Redux/Slices/Admin/student'


const Dashboard = () => {

    const {teachers} = useSelector((state) => state.adminTeacher)
    const {students} = useSelector((state) => state.adminStudent)
    const {allNotices} = useSelector((state) => state.adminNotice)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getAllNotices)
        dispatch(getAllTeachers)
        dispatch(fetchAllStudents)
    }, [])

    return (
        <>
            <HStack>
                <TotalCountCard count={students.length} bgcolor="teal" desc="Total Student" />
                <TotalCountCard count={teachers.length} bgcolor="red" desc="Total Teacher" />
                <TotalCountCard count={allNotices.length} bgcolor="blue.800" desc="Total Notice" />
                <TotalCountCard count="700" bgcolor="orange" desc="Total Complains" />
            </HStack>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
        </>
    )
}

export default Dashboard