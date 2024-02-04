import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Header from '../Small Components/Header'
import Profiles from '../Small Components/Profiles'
import ChatArea from '../Small Components/ChatArea'
import { Box } from '@chakra-ui/react'

const Chat = () => {

  const [fetchAgain, setFetchAgain] = useState(false)
  const { user } = ChatState()

  return (
    user &&
    <div style={{ width: "100%" }}>
      <Header />
      <Box display="flex" justifyContent="space-between" width="100%" p='10px' >
        <Profiles fetchAgain={fetchAgain} />
        <ChatArea fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>

  )
}

export default Chat