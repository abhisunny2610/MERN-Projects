import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("token"))
        if (userInfo) {
            setUser(userInfo)
        }else{
            navigate('/')
        }

    }, [navigate, setUser])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, setChats, chats }}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider