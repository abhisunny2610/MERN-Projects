import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url, getSender } from '../../Utils/Helper'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import UserListSkeleton from './UserListSkeleton'
import CreateGroup from './CreateGroup'

const Profiles = () => {

  const [loggedUser, setLoggedUser] = useState()
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()


  const fetchChats = async (userId) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const response = await axios.get(base_url + `chat`, config)
      setChats(response?.data)

    } catch (error) {
      console.log("error in chat", error)
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("token")))
    fetchChats()
  }, [])

  console.log("profile list", chats)
  return (
    <>
      <Box
        border='none'
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column" alignItems='center' p='2' bg='white' w={{ base: "100%", md: "31%" }} h="100%"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "18px", md: "24px" }}
          fontFamily="Work sans"
          display='flex'
          w='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          My Chats
          <CreateGroup>
            <Button diplay='flex' fontSize={{ base: "14px", md: "10px", lg: "14px" }}
              rightIcon={<i className="fa-solid fa-plus"></i>}
            >New Group Chat</Button>
          </CreateGroup>
        </Box>

        <Box
          display='flex'
          flexDir='column'
          p='3'
          bg='#F8F8F8'
          w='100%'
          h='100%'
          borderRadius='lg'
          overflowY='hidden'
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <UserListSkeleton />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Profiles