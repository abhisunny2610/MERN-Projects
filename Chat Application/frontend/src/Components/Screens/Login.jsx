import React, { useState } from 'react'
import axios from 'axios'
import {
    Spinner, FormControl, FormLabel,  Input, VStack, Button, useToast
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { base_url } from '../../Utils/Helper';

const Login = () => {

    const [formData, seFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const toast = useToast()

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
                    "Content-type": "application/json"
                }
            }
            const response = await axios.post(base_url + 'auth/login', formData, config)

            localStorage.setItem("token", JSON.stringify(response.data))
            setLoading(false)
            navigate('/chats') 
        } catch (error) {
            toast({
                title: "Inavlid email or password",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top-right"
            })
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