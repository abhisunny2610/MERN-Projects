import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assests/logo-black.png'

const Header = () => {
  return (
    <>
      <header className='d-flex align-items-center justify-content-center'>
        <div className="links d-flex gap-4">
          <Link>Home</Link>
          <Link>About</Link>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="account d-flex gap-4">
          <Link>Our Blogs</Link>
          <Link>Write Blog</Link>
          <Link>Sign in</Link>
        </div>
      </header>
    </>
  )
}

export default Header