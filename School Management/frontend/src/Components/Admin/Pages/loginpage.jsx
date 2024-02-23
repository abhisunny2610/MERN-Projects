import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/Slices/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, FormControl, Heading, Input, Text, VStack } from '@chakra-ui/react'

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
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" className='admin-login'>
      <Flex direction="column" gap={5} width="30%" border="1px solid lightgrey" borderRadius="5" p="5" className='login-card'>
        <Heading textAlign="center" >Login</Heading>
        <VStack spacing="10px">
        <FormControl isRequired>
        <Input
          type="email"
          placeholder="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        </FormControl>
        <FormControl>
        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        </FormControl>
        </VStack>
        <Button onClick={handleLogin} colorScheme='blue'>Login</Button>
      </Flex>
    </Box>
  )
}

export default LoginPage