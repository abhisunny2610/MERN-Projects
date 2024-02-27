import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllStudents } from '../../../Redux/Slices/Admin/student'
import StudentList from '../Components/StudentTable'

const AllStudent = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAllStudents())
    }, [])

  return (
    <>
    <StudentList />
    </>
  )
}

export default AllStudent