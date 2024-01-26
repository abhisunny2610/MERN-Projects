import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'

const OurBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const {config, activeUser} = useContext(AuthContext)

    useEffect(()=> {
        const getUserBlogs = async   () => {
            setLoading(true)

            try {
                const response = await axios.get()
            } catch (error) {
                
            }
        }
    }, [])

  return (
    <div>OurBlogs</div>
  )
}

export default OurBlogs