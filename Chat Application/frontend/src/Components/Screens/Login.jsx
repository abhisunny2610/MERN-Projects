import React from 'react'
import {
    FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, VStack, Button,
} from '@chakra-ui/react'

const Login = () => {
  return (
    <VStack spacing='5px'>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Email address</FormLabel>
                <Input placeholder='example@gmail.com' variant='flushed' type='email' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Password</FormLabel>
                <Input placeholder='Password' variant='flushed' type='password' />
            </FormControl>
            <Button colorScheme='telegram' w='100%' mt='20px' type='submit' >Sign Up</Button>
        </VStack>
  )
}

export default Login