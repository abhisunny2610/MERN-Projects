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
} from '@chakra-ui/react'

const AddTeacher = () => (
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
        <form method='post'>
          <Stack spacing="6">
            <Stack spacing="2">
              <Input id="name" type="text" placeholder='Name' required />
              <Input id="email" type="email" placeholder='Email' required />
              <Input id="salary" type="number" placeholder='Salary' required />
              <Input id="qualification" type="text" placeholder='Qualification' required />
              <FormControl as='fieldset'>
                <RadioGroup defaultValue='Itachi' colorScheme='teal'>
                  <HStack spacing='24px'>
                    <Radio value='Sasuke'>Male</Radio>
                    <Radio value='Nagato'>Female</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Input id="email" type="email" placeholder='Enter email' required />
              <Input id="email" type="email" placeholder='Enter email' required />
              <Input id="email" type="email" placeholder='Enter email' required />
              <Input id="email" type="email" placeholder='Enter email' required />
            </Stack>
            <Button colorScheme='teal'>Submit</Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  </Container>
)

export default AddTeacher