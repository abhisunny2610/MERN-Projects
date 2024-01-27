import {
    FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, VStack, Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'

// CLOUDINARY_URL=cloudinary://254422416915595:YbMjjS3h8SyxEKTiXQVBPn36MRE@deprtb7in

const Signup = () => {

    const [formData, seFormData] = useState({
        name: '',
        email: '',
        password: '',
        profileImage: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value, files} = e.target
        const file = files && files[0]
        seFormData((prevData)=> ({
            ...prevData,
            [name]: name === 'profileImage' ? file : value,
        }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        console.log("data", formData)
        setLoading(false)
    }

    return (
        <VStack spacing='5px'>
            <FormControl isRequired>
                <FormLabel mb='0px'>User name</FormLabel>
                <Input placeholder='John Doe' type='text' variant='flushed'
                name='name'
                value={formData.name}
                onChange={handleChange}
                />
            </FormControl>
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
            <FormControl>
                <FormLabel mt='15px'>Profile Image</FormLabel>
                <Input placeholder=' Confirm Password' variant='flushed' type='file' accept='image/*' 
                name='profileImage'
                value={formData.profileImage}
                onChange={handleChange}
                />
            </FormControl>
            <Button colorScheme='telegram' w='100%' mt='20px' type='submit' onClick={handleSubmit} >Sign Up</Button>
        </VStack>
    )
}

export default Signup