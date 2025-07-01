import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='nav-bar'>
        <img className='logo' src={assets.foodfavicon}/>
        <img src={assets.profile_image}/>
    </div>
  )
}

export default Navbar