import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../Utils/helper'
import Shimmer from './CardShimmer'

const Card = ({ blog }) => {
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
            <p><i className="fa-regular fa-calendar mx-1"></i>{formatDate(createdAt)}</p>
            <p className='mx-5'><i className="fa-regular fa-message mx-1"></i>05</p>
          </div>
          <p className="caption">
            {content.slice(0, 100)}...
          </p>

          <div className="links">
            <Link to={'/blog/' + _id}>READ MORE<i className="fa-solid fa-arrow-right-long mx-2"></i></Link>
            <p><i className="fa-regular fa-folder-closed mx-1"></i>{category}</p>
          </div>
        </div>
      </div>
    </>
  )

}

const BlogCards = () => {

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  const getBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8001/api/blog');
      const data = await response?.data;
      setBlogs(data?.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className='blog-cards'>
      {loading ? <Shimmer /> : (blogs.slice(0, 8).map((blog) => {
        return <Link to={'/blog/' + blog._id} key={blog._id} className='text-decoration-none'><Card blog={blog} key={blog._id} /></Link>
      }))
      }

    </div>
  )
}

export default BlogCards
