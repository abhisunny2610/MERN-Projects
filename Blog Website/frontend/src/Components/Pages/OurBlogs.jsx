import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import Shimmer from '../CardShimmer'
import { Link } from 'react-router-dom'
import { formatDate } from '../../Utils/helper'

const Card = ({ blog, handleDelete }) => {
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

            <div className="options">
                <Link>Edit</Link>
                <button onClick={()=>handleDelete(_id)}>Delete</button>
            </div>
          </div>
        </div>
      </>
    )
  
  }

const OurBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const { config, activeUser } = useContext(AuthContext)
    const [error, setError] = useState('')

    const getUserBlogs = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:8001/api/blog/ourBlogs', config)
            const data = await response?.data
            setBlogs(data.blogs)
        } catch (error) {
            setError("Data not found")
        } finally {
            setLoading(false)
        }
    }

    const handleDeletBlog = async (blogId) => {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:8001/api/blog/${blogId}`, config)
            setBlogs(blogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            setError("Failed to delete blog")
        } finally {
            setLoading(false)
        }
    }

    console.log("Blogs", blogs)

    useEffect(() => {
        getUserBlogs()
    }, [])

    return (
        <div className='blog-cards'>
            {loading ? <Shimmer /> : (
                Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map((blog) => {
                        return <Card blog={blog} key={blog._id} handleDelete={handleDeletBlog}/>
                    })
                ) : (
                    <p>No blogs found</p>
                )
            )}

        </div>
    )
}

export default OurBlogs