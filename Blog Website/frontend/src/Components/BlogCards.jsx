import React, { useEffect, useState } from 'react'
import img1 from '../Assests/pexels-plann-4549414.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../Utils/helper'

const Card = ({blog}) => {
  const { _id, title, category, content, createdAt, coverImage } = blog
  return (
    <>
      <div className="blog-card shine">
        <div className="image-section">
          <img src={coverImage} alt={blog._id} />
        </div>

        <div className="description-section">
          <h6>{title}</h6>
          <div className="date">
            <p><i class="fa-regular fa-calendar mx-1"></i>{formatDate(createdAt)}</p>
            <p className='mx-5'><i class="fa-regular fa-message mx-1"></i>05</p>
          </div>
          <p className="caption">
            {content.slice(0,100)}...
          </p>

          <div className="links">
            <Link>READ MORE<i class="fa-solid fa-arrow-right-long mx-2"></i></Link>
            <p><i class="fa-regular fa-folder-closed mx-1"></i>{category}</p>
          </div>
        </div>
      </div>
    </>
  )

}

const BlogCards = () => {

  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/blog');
      const data = await response?.data;
      setBlogs(data?.data);
      console.log("API Response:", data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className='blog-cards'>
      {
          blogs.slice(0,8).map((blog) => (
            <Card blog={blog} key={blog._id} />
          ))
  
    }
    </div>
  )
}

export default BlogCards
