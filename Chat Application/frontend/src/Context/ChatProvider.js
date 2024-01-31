import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("token"))
        setUser(userInfo)

        if(!userInfo){
            return redirect('/')
        }

    }, [])

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider