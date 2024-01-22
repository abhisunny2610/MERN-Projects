import React, { useEffect, useState } from 'react'
import img1 from '../Assests/pexels-plann-4549414.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Card = () => {

  return(
    <>
      <div className="blog-card shine">
        <div className="image-section">
          <img src={img1} alt=""/>
        </div>
        <div className="description-section">
          <h6>There's going to be a musical about meghan</h6>
          <div className="date">
            <p><i class="fa-regular fa-calendar mx-1"></i>20th Nov, 2023</p>
            <p className='mx-5'><i class="fa-regular fa-message mx-1"></i>05</p>
          </div>
          <p className="caption">
          Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.
          </p>

          <div className="links">
            <Link>READ MORE<i class="fa-solid fa-arrow-right-long mx-2"></i></Link>
            <p><i class="fa-regular fa-folder-closed mx-1"></i>Travel</p>
          </div>
        </div>
      </div>
    </>
  )
  
}

const BlogCards = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(()=> {
    
  }, [])

  const getBlogs = async()=> {
    const response = axios.get
  }

  return (
    <div className='blog-cards'>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    </div>
  )
}

export default BlogCards
