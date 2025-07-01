import React from 'react'
import { assets } from '../../assets/assets'
import foodfavicon from '../../assets/foodfavicon.webp'
import './Footer.css'
const Footer = () => {
  return (
   <footer className="footer" id='footer'>
  <div className="footer-top">
    <div className="footer-logo">
      <img src={foodfavicon} alt="FoodApp" />
      <h2>FoodApp</h2>
    </div>

    <div className="footer-links">
      <a href="/">Home</a>
      <a href="#menu">Menu</a>
      <a href="/">About</a>
      <a href="#footer">Contact</a>
    </div>

    <div className="footer-socials">
      <a href="#"><i class="ri-linkedin-fill"></i></a>
      <a href="#"><i className="ri-instagram-line"></i></a>
      <a href="#"><i className="ri-twitter-fill"></i></a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} FoodApp. All rights reserved.</p>
  </div>
</footer>
  )
}

export default Footer