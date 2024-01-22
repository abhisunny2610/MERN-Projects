import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [activeUser, setActiveUser] = useState({})

    const [config, setConfig] = useState({
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
    })

    useEffect(() => {
        const controlAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/auth/private', config)
                setActiveUser(response.data.user)
            } catch (err) {
                localStorage.removeItem("authToken");

                setActiveUser({})
            }
        }
        controlAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContextProvider