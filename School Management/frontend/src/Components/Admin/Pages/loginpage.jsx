import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/Slices/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex , Text} from '@chakra-ui/react'

const LoginPage = () => {

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", role: "admin", password: "" })
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login(credentials))
      .then(() => {
        navigate('/dashboard')
      })
      .catch(error => {
        console.log('Login failed:', error);
      });
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" >
      <Flex direction="column" gap={10}>
        <Text >Login</Text>
        <input
          type="email"
          placeholder="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button onClick={handleLogin}>Login</Button>
      </Flex>
    </Box>
  )
}

export default LoginPage