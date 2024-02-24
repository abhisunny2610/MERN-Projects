import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Redux/Slices/Admin/auth'
import { useNavigate} from 'react-router-dom'
import { Box, Button, Container, FormControl, Heading, Input, Stack, FormLabel, HStack, Divider, Spinner } from '@chakra-ui/react'

const LoginPage = () => {

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", role: "admin", password: "" })
  const dispatch = useDispatch()

  const {isLoading} = useSelector((state) => state.auth)

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
    <div className='admin-login'>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Box
           background={"white"}
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack>
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={{ base: 'xs', md: 'md' }} >Log in to admin account</Heading>
                <Divider marginBottom={"20px"}/>
              </Stack>
            </Stack>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email"
                  required
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input
                  required
                    id='password'
                    type='password'
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                </FormControl>
              </Stack>
              <HStack justify="flex-end">
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button onClick={handleLogin} variant={"solid"} colorScheme='blue'>{isLoading ? <Spinner /> : "Sign in"}</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  )
}

export default LoginPage





