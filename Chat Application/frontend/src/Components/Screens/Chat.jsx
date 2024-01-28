import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const Chat = () => {

    const {user} = ChatState()

  return (
    <div>Chat</div>
  )
}

export default Chat