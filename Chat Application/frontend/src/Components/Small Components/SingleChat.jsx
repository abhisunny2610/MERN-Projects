import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { getSender, getSenderDetails } from '../../Utils/Helper'
import ProfileModel from './ProfileModel'
import UpdateGroupModel from './UpdateGroupModel'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

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