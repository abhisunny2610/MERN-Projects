import React, { useEffect, useState } from 'react'
import {
    Badge,
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { classes, subjects, teacherResponsibilities } from '../../../Helper'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTeacher, updateTeacher } from '../../../Redux/Slices/Admin/teacher'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTeacher = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const { singleTeacher } = useSelector((state) => state.adminTeacher)
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getSingleTeacher(id))
    }, [dispatch, id])

    useEffect(() => {
        setData(singleTeacher)
    }, [singleTeacher])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, child] = name.split('.');

        if (child) {
            setData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...(prevData[parent] || {}),
                    [child]: value,
                },
            }));
        } else if (["salary", "experience", "age"].includes(name)) {
            setData({
                ...data,
                [name]: parseInt(value) || 0, 
            })
        } else if (name === "subjects" || name === "responsibilities" || name === "classesHandled") {
            const key = name;
            const newValue = value;
            const newArray = Array.isArray(data[key]) ? [...data[key]] : [];

            const valueExists = newArray.includes(newValue);
            setData((prevData) => ({
                ...prevData,
                [key]: valueExists
                    ? newArray.filter(item => item !== newValue)
                    : [...newArray, newValue]
            }));
        } else {
            
            setData({
                ...data,
                [name]: value
            });
        }
    };




    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTeacher({ id, credentials: data }))
        toast({
            title: "Teacher Updated",
            status: "success",
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          })
        navigate('/teachers')
    }


    return (
        <Container maxW="2xl">
            <Stack spacing="8">
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">

                    <Heading size={{ base: 'sm', md: 'md' }}>Update Teacher</Heading>

                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <Flex justifyContent="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Teacher id</FormLabel>
                                    <Input type='number' name='teacherId' value={data?.teacherId} onChange={handleChange} />
                                </FormControl>
                                <FormControl flex="1">
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" name="name" value={data?.name || ""} onChange={handleChange} />
                                </FormControl>
                            </Flex>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" value={data?.email || ""} onChange={handleChange} />
                            </FormControl>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Salary</FormLabel>
                                    <Input type="number" name="salary" value={data?.salary || ""} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Gender</FormLabel>
                                    <Select name="gender" value={data?.gender || ""} onChange={handleChange}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Select>
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Qualification</FormLabel>
                                    <Input type="text" name="qualification" value={data?.qualification || ""} onChange={handleChange} />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Street</FormLabel>
                                    <Input type="text" name="address.street" value={data?.address?.street || ""} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>City</FormLabel>
                                    <Input type="text" name="address.city" value={data?.address?.city || ""} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>State</FormLabel>
                                    <Input type="text" name="address.state" value={data?.address?.state || ''} onChange={handleChange} />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Country</FormLabel>
                                    <Input type="text" name="address.country" value={data?.address?.country || ""} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Postal Code</FormLabel>
                                    <Input type="text" name="address.postalCode" value={data?.address?.postalCode || ""} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Profile</FormLabel>
                                    <Input type="text" name="profileImage" value={data?.profileImage || ""} onChange={handleChange} />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Responsibilities</FormLabel>
                                <Select name='responsibilities' value={data?.responsibilities || ""} onChange={handleChange}>
                                    {
                                        teacherResponsibilities.map((res, index) => {
                                            return <option value={res} key={index}>{res}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <Flex flexWrap="wrap">
                                {data?.responsibilities?.map((subject, index) => (
                                    <Badge marginRight="5px" marginTop="5px" key={index}>{subject}</Badge>
                                ))}
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Experience</FormLabel>
                                    <Input type="text" name="experience" value={data?.experience} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Phone</FormLabel>
                                    <Input type="tel" name="contact.phone" value={data?.contact?.phone} onChange={handleChange} />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Input type="date" name="dateOfBirth"
                                        value={data?.dateOfBirth ? new Date(data?.dateOfBirth).toISOString().substr(0, 10) : ''}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                            
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Joining Date</FormLabel>
                                    <Input type='date' name='dateOfJoining'
                                        value={data?.dateOfJoining ? new Date(data?.dateOfJoining).toISOString().substr(0, 10) : ''}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Performace</FormLabel>
                                    <Input type="text" name="performance" value={data?.performance} onChange={handleChange} />
                                </FormControl>
                            </Flex>
                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Subjects</FormLabel>
                                    <Select name="subjects" value={data?.subjects} onChange={handleChange}>
                                        {
                                            subjects.map((subject, index) => {
                                                return <option value={subject} key={index}>{subject}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Classes Handled</FormLabel>
                                    <Select name="classesHandled" value={data?.classesHandled} onChange={handleChange}>
                                        {
                                            classes.map((cls, index) => {
                                                return <option value={cls} key={index}>{cls}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Flex>


                            <Flex flexWrap="wrap" justifyContent="space-between">
                                <Box flex={1} mr={2}>
                                    {(data?.subjects || []).map((subject, index) => (
                                        <Badge marginRight="5px" marginTop="5px" key={index}>{subject}</Badge>
                                    ))}
                                </Box>
                                <Box flex={1}>
                                {data?.classesHandled?.map((subject, index) => (
                                    <Badge marginRight="5px" marginTop="5px" key={index}>{subject}</Badge>
                                ))}
                                </Box>
                            </Flex>

                            <FormControl>
                                <Checkbox isChecked={data?.isPermanent} name="isPermanent" onChange={handleCheckboxChange}>
                                    Is Permanent
                                </Checkbox>
                            </FormControl>
                            <Button type="submit" marginTop={3} colorScheme='teal'>Submit</Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>

    )
}

export default UpdateTeacher