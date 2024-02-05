import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { base_url, getSender, getSenderDetails } from '../../Utils/Helper'
import ProfileModel from './ProfileModel'
import UpdateGroupModel from './UpdateGroupModel'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")


    const { user, selectedChat, setSelectedChat } = ChatState()
    const toast = useToast()

    const typingHandler = async (e) => {
        setNewMessage(e.target.value)

        // Typing indicator logic
    }

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                setNewMessage("")
                const { data } = await axios.post(base_url + "message", {
                    chatId: selectedChat._id,
                    content: newMessage
                }, config)

                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                })
            }
        }
    }

    const fetchAllMessages = async () => {
        if(!selectedChat) return;

        setLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(base_url + `message/${selectedChat._id}`, config)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to load the messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        }
    }

    useEffect(()=> {
        fetchAllMessages()
    }, [selectedChat])

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
                                icon={<i className="fa-solid fa-arrow-left"></i>}
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
                                        <UpdateGroupModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchAllMessages={fetchAllMessages} />
                                    </>
                                )
                            }
                            {/* <IconButton
                                backgroundColor="lightgrey"
                                icon={<i class="fa-solid fa-eye"></i>}
                            ></IconButton> */}
                        </Text>

                        {/* message area */}
                        <Box
                            display="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p="1"
                            w="100%"
                            h="100%"
                            overflowY="hidden"
                        >
                            {
                                loading ? (<Spinner color='white' size='xl' w="20" h="20" alignSelf="center" margin="auto" />) : (
                                    <>
                                        <div className='messages'>
                                            <ScrollableChat messages={messages} />
                                        </div>
                                    </>
                                )
                            }
                            <FormControl display="flex" onKeyDown={sendMessage} isRequired>
                                <Input placeholder='Type a message'
                                    fontFamily="Work sans"
                                    borderRadius="none"
                                    bg="light"
                                    value={newMessage}
                                    onChange={typingHandler}
                                />
                                <IconButton
                                    onClick={() => sendMessage({ key: "Enter" })}
                                    borderRadius="none"
                                    icon={<i className="fa-regular fa-paper-plane fa-rotate-by" style={{ color: "#ffffff" }}></i>}
                                    bg="green"
                                />
                            </FormControl>
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