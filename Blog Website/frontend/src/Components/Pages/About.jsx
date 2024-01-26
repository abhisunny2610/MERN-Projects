import React from 'react'
import img1 from '../../Assests/logo-no-background.png'

const About = () => {
  return (
    <div className="about-section-page">
        <div className="about-content d-flex justify-content-between">
            <div className="left">
                <img src={img1} alt=""/>
            </div>
            <div className="right">
                <h3>Know More About NexVerse</h3>
                <p>Welcome to NexVerse, your ultimate destination for insightful articles, helpful tips, and inspiring stories. Dive into a diverse range of topics, including travel, food, health and many more, and join our vibrant community of like-minded individuals and experts. Stay updated with our regular newsletter and social media updates, and start exploring today for a journey of discovery, learning, and inspiration. Join us at NexVerse and unlock a world of knowledge and connection.</p>
            </div>
        </div>
    </div>
  )
}

export default About