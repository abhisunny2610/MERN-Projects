import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import Header from '../Small Components/Header'
import Profiles from '../Small Components/Profiles'
import ChatArea from '../Small Components/ChatArea'

const Chat = () => {

    const {user} = ChatState()

  return (
      user && <div style={{width: "100%"}}>
        <Header />
        <Profiles />
        <ChatArea />
      </div>
    
  )
}

export default Chat