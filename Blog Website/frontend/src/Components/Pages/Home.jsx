import React from 'react'
import HeroSection from '../HeroSection'
import BlogCards from '../BlogCards'
import Sidebar from '../Sidebar'

const Home = () => {
  return (
    <>
    <HeroSection/>
    <div>
        <BlogCards />
        <Sidebar />
    </div>
    </>
  )
}

export default Home