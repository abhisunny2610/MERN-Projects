import React, { useEffect } from 'react'
import { Image,Box,Flex,Spacer, Container, Text, Tabs, TabList, Tab, TabPanel, TabPanels} from '@chakra-ui/react'
import Login from './Login'
import Signup from './Signup'
import logo from '../../Assests/logo.png'
// import { useNavigate } from "react-router";

const Home = () => {

    // const navigate = useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("token"))
        // if(userInfo) navigate('/chats')
    }, [])

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' p='30px'>
            <Box>
                <Image src={logo} alt='logo' boxSize='400px' />
            </Box>
            <Spacer />
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
        </Flex>
    )
}

export default Home