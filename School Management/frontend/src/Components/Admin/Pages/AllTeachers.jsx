import React, { useEffect } from 'react'
import TeachersList from '../Components/TeacherTable'
import { useDispatch } from 'react-redux'
import { getAllTeachers } from '../../../Redux/Slices/Admin/teacher'
import { config } from '../../../Redux/Slices/Admin/auth'

const AllTeachers = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllTeachers(config))
  }, [])

  return (
    <>
    <TeachersList />
    </>
  )
}

export default AllTeachers