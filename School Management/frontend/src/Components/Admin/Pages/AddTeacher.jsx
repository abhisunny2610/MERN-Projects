import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Select,

} from '@chakra-ui/react'
import { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit} method='post'>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Salary</FormLabel>
                <Input type="number" name="salary" value={formData.salary} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Qualification</FormLabel>
                <Input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Subjects</FormLabel>
                <Input type="text" name="subjects" value={formData.subjects} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                {/* <DatePicker name="dateOfBirth" selected={formData.dateOfBirth} onChange={(date) => setFormData({...formData, dateOfBirth: date})} /> */}
              </FormControl>

              <Button type="submit" colorScheme="blue">Submit</Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}

export default AddTeacher