import React from 'react'
import { Box, Container, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import Login from './Login'
import Signup from './Signup'

const Home = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box d='flex' justifyContent='center' p={3} bg={'white'} w='100%' m="40px 0 15px 0" borderRadius="lg" borderWidth='1px' >
                <Text fontSize="2xl" color="black" textAlign='center' fontFamily='Work Sans' >Chit - Chat</Text>
            </Box>
            <Box bg='white' w='100%' p='4' borderRadius="lg" borderWidth='1px' mb='40px' >
                <Tabs size='md' variant='soft-rounded'>
                    <TabList mb='1em'>
                        <Tab width="50%" >Login</Tab>
                        <Tab width='50%' >Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home