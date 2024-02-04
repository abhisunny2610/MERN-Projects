import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'
import background from '../../Assests/chat_background.png'

const ChatArea = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = ChatState()

  return (
    <>
      <Box
        backgroundImage={`url(${background})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display={{ base: selectedChat ? 'flex' : "none", md: "flex" }}
        alignItems='center'
        flexDir='column'
        p={3}
        backgroundColor="transparent"
        height='88vh'
        w={{ base: "100%", md: "96%" }}
      ><SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></Box>
    </>
  )
}


export default ChatArea