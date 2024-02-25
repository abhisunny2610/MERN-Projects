import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
  Flex,
  Badge
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers, registerTeacher } from '../../../Redux/Slices/Admin/teacher';
import { config } from '../../../Redux/Slices/Admin/auth';

const AddTeacher = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
    gender: "",
    qualification: "",
    subjects: [],
    phone: "",
    dateOfBirth: null
  });

  const dispatch = useDispatch()
  const subjects = [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Civics",
    "Economics",
    "Physical Education",
    "Computer Science",
    "Art / Drawing",
    "Hindi",
    "Music",
    "Environmental Science",
    "Moral Science / Ethics",
    "Health Education",
    "Home Science",
    "General Knowledge",
    "Sanskrit",
    "Psychology",
    "Business Studies",
    "Accounting",
    "Economics",
    "Political Science",
    "Sociology",
    "Legal Studies",
    "Statistics",
    "Agricultural Science",
    "Engineering Drawing",
    "Information Technology",
    "Design and Technology",
    "Religious Studies",
    "Media Studies",
    "Theater Studies",
    "Games"
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "salary") {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } if (name === "subjects") {
      if (!formData.subjects.includes(value)) {
        setFormData({
          ...formData,
          subjects: [...formData.subjects, value]
        });
      } else {
        setFormData({
          ...formData,
          subjects: formData.subjects.filter(subject => subject !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerTeacher(formData))
    console.log(formData); // You can handle form submission here
  };

  return (
    <Container>
      <Stack spacing="8">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">

          <Heading size={{ base: 'xs', md: 'sm' }}>Add New Teacher</Heading>

        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>

              <Flex justify="space-between">
                <FormControl flex="1" mr={2}>
                  <FormLabel>Salary</FormLabel>
                  <Input type="number" name="salary" value={formData.salary} onChange={handleInputChange} />
                </FormControl>

                <FormControl flex="1">
                  <FormLabel>Gender</FormLabel>
                  <Select name="gender" value={formData.gender} onChange={handleInputChange} multiple={false}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex justify="space-between">
                <FormControl flex="1" mr={2}>
                  <FormLabel>Qualification</FormLabel>
                  <Input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} />
                </FormControl>

                <FormControl flex="1" mr={2}>
                  <FormLabel>Phone</FormLabel>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                </FormControl>

                <FormControl flex="1">
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type='date' name='dateOfBirth' selected={formData.dateOfBirth} onChange={handleInputChange} />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel>Subjects</FormLabel>
                <Select name="subjects" value={formData.subjects} onChange={handleInputChange} multiple={false}>
                  {
                    subjects.map((subject, index) => {
                      return <option value={subject} key={index}>{subject}</option>
                    })
                  }
                </Select>
              </FormControl>

              <Flex flexWrap="wrap">
              {formData.subjects.map((subject, index) => (
                <Badge marginRight="5px" marginTop="5px" key={index}>{subject}</Badge>
              ))}
              </Flex>

              <Button type="submit" colorScheme="blue">Submit</Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}

export default AddTeacher