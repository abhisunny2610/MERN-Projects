import React, { useState } from 'react'
import axios from 'axios'
import {
    Spinner, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, VStack, Button,
} from '@chakra-ui/react'
import { redirect } from "react-router-dom";

const Login = () => {

    const [formData, seFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        seFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.post('http://localhost:6001/api/auth/login', formData, config)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            redirect('/chats') 
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <VStack spacing='5px'>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Email address</FormLabel>
                <Input placeholder='example@gmail.com' variant='flushed' type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='15px' mb='0px'>Password</FormLabel>
                <Input placeholder='Password' variant='flushed' type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </FormControl>
            <Button colorScheme='telegram' w='100%' mt='20px' type='submit' onClick={handleSubmit}>{loading ? (<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='lg'
            />) : 'Login'}</Button>
        </VStack>
    )
}

export default Login