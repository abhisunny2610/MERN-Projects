import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../../Utils/helper'

const SingleBlog = () => {

    const { id } = useParams()

    const [blog, setBlog] = useState({})

    const getBlog = async (id) => {
        try {
            
            const response = await axios.get(`http://localhost:8001/api/blog/${id}`);
            const data = await response?.data;
            setBlog(data?.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getBlog(id)
    }, [])

    return (
        <div className="single-blog">
            <div className="single-blog-content">
                <h2>{blog.title}</h2>

                <div className="author">
                    <div className="image">
                        <img src={blog.coverImage} alt="" />
                    </div>
                    <div className="details">
                        <h5>Tom Colvin</h5>
                        <p>Published in <span>NexVerse</span> - {formatDate(blog.createdAt)}</p>
                    </div>
                </div>
                <div className="cover-image">
                    <img src={blog.coverImage} alt="" />
                </div>
                <div className="content">
                    <p>{blog.content}</p>
                </div>

            </div>
        </div>
    )
}

export default SingleBlog