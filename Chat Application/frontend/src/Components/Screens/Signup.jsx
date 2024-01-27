import {
    FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, VStack, Button,
} from '@chakra-ui/react'
import React from 'react'

const Signup = () => {

    return (
        <VStack spacing='5px'>
            <FormControl isRequired>
                <FormLabel mb='0px'>User name</FormLabel>
                <Input placeholder='John Doe' type='text' variant='flushed' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Email address</FormLabel>
                <Input placeholder='example@gmail.com' variant='flushed' type='email' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Password</FormLabel>
                <Input placeholder='Password' variant='flushed' type='password' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Confirm Password</FormLabel>
                <Input placeholder=' Confirm Password' variant='flushed' type='password' />
            </FormControl>
            <FormControl>
                <FormLabel mt='15px'>Profile Image</FormLabel>
                <Input placeholder=' Confirm Password' variant='flushed' type='file' accept='image/*' />
            </FormControl>
            <Button colorScheme='telegram' w='100%' mt='20px' type='submit' >Sign Up</Button>
        </VStack>
    )
}

export default Signup