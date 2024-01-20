import React from 'react'
import img1 from '../Assests/pexels-plann-4549414.jpg'
import {Link} from 'react-router-dom'

const Card = () => {

  return(
    <>
      <div className="blog-card">
        <div className="image-section">
          <img src={img1} alt=""/>
        </div>
        <div className="description-section">
          <h6>There's going to be a musical about meghan</h6>
          <div className="date">
            <p>20th Nov, 2023</p>
            <p className='mx-5'>05</p>
          </div>
          <p className="caption">
          Creepeth green light appear let rule only you're divide and lights moving and isn't given creeping deep.
          </p>

          <div className="links">
            <Link>READ MORE</Link>
            <p>Travel</p>
          </div>
        </div>
      </div>
    </>
  )
  
}

const BlogCards = () => {
  return (
    <>
    <Card />
    </>
  )
}

export default BlogCards
