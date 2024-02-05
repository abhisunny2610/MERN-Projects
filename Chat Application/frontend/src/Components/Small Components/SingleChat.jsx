import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Spinner, Text } from '@chakra-ui/react'
import { getSender, getSenderDetails } from '../../Utils/Helper'
import ProfileModel from './ProfileModel'
import UpdateGroupModel from './UpdateGroupModel'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()


    const { user, selectedChat, setSelectedChat } = ChatState()

    return (
        <>

            {
                selectedChat ? (
                    <>
                        <Text
                            fontSize={{ base: "18px", md: "24px" }}
                            px="2"
                            w="100%"
                            fontFamily="Work sans"
                            display='flex'
                            justifyContent={{ base: "space-between" }}
                            alignItems="center"
                            backgroundColor="lightgrey"
                        >
                            <IconButton display={{ base: "flex", md: "none" }}
                                backgroundColor="lightgrey"
                                icon={<i class="fa-solid fa-arrow-left"></i>}
                                onClick={() => setSelectedChat("")}
                            >
                            </IconButton>
                            {
                                !selectedChat.isGroupChat ? (
                                    <>
                                        {getSender(user, selectedChat.users)}
                                        <ProfileModel user={getSenderDetails(user, selectedChat.users)} />
                                    </>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <UpdateGroupModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                                    </>
                                )
                            }
                            {/* <IconButton
                                backgroundColor="lightgrey"
                                icon={<i class="fa-solid fa-eye"></i>}
                            ></IconButton> */}
                        </Text>

                        {/* Display messages */}
                        <Box
                            display="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p="3"
                            w="100%"
                            h="100%"
                            overflowY="hidden"
                        >
                            {
                                !loading ? (<Spinner color='white' size='xl' w="20" h="20" alignSelf="center" margin="auto" />) : (
                                    <>

                                    </>
                                )
                            }
                        </Box>
                    </>
                ) : (
                    <Box display="flex" alignItems='center' justifyContent='center' h="100%" >
                        <Text fontSize='3xl' pb='3' fontFamily='Work sans' color='white' >
                            Click on a user to start chatting.
                        </Text>
                    </Box>
                )
            }

        </>
    )
}

export default SingleChat