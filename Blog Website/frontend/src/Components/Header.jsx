import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assests/logo-no-background.png'
import { AuthContext } from '../Context/AuthContext'

const Header = () => {

  const bool = localStorage.getItem("authToken") ? true : false
  const [auth, setAuth] = useState(bool)
  const {activeUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`d-flex align-items-center justify-content-between ${scrollPosition > 150 ? 'white-background' : ''} `} >
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="links d-flex gap-4">
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </div>
        <div className="account d-flex gap-4">
          <Link to='/writeBlog'>Write Blog</Link>
          <Link to='/ourBlogs'>Our Blogs</Link>
          <Link to='/signin'>Sign in</Link>
        </div>
      </header>
    </>
  )
}

export default Header