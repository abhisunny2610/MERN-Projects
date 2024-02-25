import React from 'react'
import {
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
} from '@chakra-ui/react'
import { classes, subjects, teacherResponsibilities } from '../../../Helper'

const UpdateTeacher = () => {
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
                    <form>
                        <Stack>
                            <Flex justifyContent="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Teacher id</FormLabel>
                                    <Input type='number' name='teacherId' />
                                </FormControl>
                                <FormControl flex="1">
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" name="name" />
                                </FormControl>
                            </Flex>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" />
                            </FormControl>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Salary</FormLabel>
                                    <Input type="number" name="salary" />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Gender</FormLabel>
                                    <Select name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Select>
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Qualification</FormLabel>
                                    <Input type="text" name="qualification" />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Street</FormLabel>
                                    <Input type="text" name="street" />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>City</FormLabel>
                                    <Input type="text" name="city" />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>State</FormLabel>
                                    <Input type="text" name="state" />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Country</FormLabel>
                                    <Input type="text" name="country" />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Postal Code</FormLabel>
                                    <Input type="text" name="postalCode" />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Profile</FormLabel>
                                    <Input type="text" name="profileImage" />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Responsibilities</FormLabel>
                                <Select name='responsibilities'>
                                    {
                                        teacherResponsibilities.map((res, index) => {
                                            return <option value={res} key={index}>{res}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Experience</FormLabel>
                                    <Input type="text" name="experience" />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Phone</FormLabel>
                                    <Input type="tel" name="phone" />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Input type='date' name='dateOfBirth' />
                                </FormControl>
                            </Flex>

                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Salary</FormLabel>
                                    <Input type="number" name="salary" />
                                </FormControl>

                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Joining Date</FormLabel>
                                    <Input type='date' name='dateOfJoining' />
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Performace</FormLabel>
                                    <Input type="text" name="performance" />
                                </FormControl>
                            </Flex>
                            <Flex justify="space-between">
                                <FormControl flex="1" mr={2}>
                                    <FormLabel>Subjects</FormLabel>
                                    <Select name="subjects">
                                        {
                                            subjects.map((subject, index) => {
                                                return <option value={subject} key={index}>{subject}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl flex="1">
                                    <FormLabel>Classes Handled</FormLabel>
                                    <Select name="classesHandled">
                                        {
                                            classes.map((cls, index) => {
                                                return <option value={cls} key={index}>{cls}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <Checkbox>
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