import React, { useEffect } from 'react'
import TeachersList from '../Components/TeacherTable'
import { useDispatch } from 'react-redux'
import { getAllTeachers } from '../../../Redux/Slices/Admin/teacher'

const AllTeachers = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllTeachers())
  }, [])

  return (
    <>
    <TeachersList />
    </>
  )
}

export default AllTeachers