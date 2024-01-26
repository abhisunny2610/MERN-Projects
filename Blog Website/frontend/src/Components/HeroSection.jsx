import React from 'react'


const HeroSection = () => {
  return (
    <div className="hero-section text-light d-flex">
      <div className="hero-section-content">

        <h2>Best Place to Find Your <span>Favorite</span> Blogs.</h2>
        <p>Discover millions of blog title with the best content offered here.</p>
        <p>Available for all the peoples in free.</p>

        <form action="">
          <input type="text" placeholder='Travel' />
          <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>

      </div>
    </div>
  )
}

export default HeroSection