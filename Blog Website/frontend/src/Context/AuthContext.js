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

}