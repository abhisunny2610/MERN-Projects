import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Flex, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { base_url, getSender, getSenderDetails } from '../../Utils/Helper'
import ProfileModel from './ProfileModel'
import UpdateGroupModel from './UpdateGroupModel'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'
import Lottie from 'react-lottie'
import io from "socket.io-client"
import animationData from '../../Assests/Animation.json'

const ENDPOINT = "http://localhost:6001"
var socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const { user, selectedChat, setSelectedChat } = ChatState()
    const toast = useToast()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    }, [])

    const typingHandler = async (e) => {
        setNewMessage(e.target.value)

        // Typing indicator logic
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;

        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id)
                setTyping(false)
            }

        }, timerLength);
    }


    useEffect(() => {
        fetchAllMessages()
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                // give notification

            } else {
                setMessages([...messages, newMessageReceived])
            }
        })
    })

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id)
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
                socket.emit("new message", data)
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
        if (!selectedChat) return;

        setLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(base_url + `message/${selectedChat._id}`, config)
            setMessages(data)
            setLoading(false)

            socket.emit("join chat", selectedChat._id)

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
                                {isTyping ? (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <Lottie
                                            width={70}
                                            options={defaultOptions}
                                        />
                                    </div>
                                ) : null}
                            <FormControl onKeyDown={sendMessage} isRequired>
                                <Flex alignItems="center">
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
                                </Flex>
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