import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Slices/auth'
import { Button } from '@chakra-ui/react'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <Button onClick={handleLogout} colorScheme='red' size={'sm'}>Logout</Button>
  )
}

export default LogoutButton