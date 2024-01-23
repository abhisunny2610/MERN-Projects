import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="about-section">
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. <br /> Aperiam nihil fuga cupiditate</p>
        </div>
        <div className="newsletter">
          <h5>Newsletter</h5>
          <p>Stay update with our latest</p>
          <div className="input">
            <input type="text" placeholder='ENTER EMIAL' />
            <button><i className="fa-solid fa-arrow-right-long "></i></button>
          </div>
        </div>
        <div className="social-media">
          <h5>Follow Us</h5>
          <p>Let us be social</p>
          <div className="icons">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-internet-explorer"></i>
          </div>
        </div>
      </div>
      <p>Copyright ©2024 All rights reserved | This website is made with ❤️ by <span>Abhishek</span></p>
    </footer>
  )
}

export default Footer