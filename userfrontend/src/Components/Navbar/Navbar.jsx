import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react';
import Loginpopup from '../Loginpopup/Loginpopup';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import foodfavicon from '../../assets/foodfavicon.webp'
const Navbar = ({showlogin,setshowlogin}) => {

  const {getToatlCartAmount,token,setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const Logout = ()=>{
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }


  return (<>
    <div className  ='nav-bar'>
        <Link style={{color:'black'}} to='/'><img className='logo' src={foodfavicon}/></Link>
        <ul className='nav-ul'> 
            <Link style={{color:'black'}} to='/'><li key={1} className='Home'><a>Home</a></li></Link>
            <li key={2} className='Menu'><a href='#menu'>Menu</a></li>
           <li  key={3} className='Contact-Us'><a href='#footer'>Contact Us</a></li>
            <div className='move'></div>
        </ul>
        <div className='nav-right'>
        <div className='bucket-logo'>
           <Link to='/Cart'>
           <i className="ri-shopping-cart-2-fill"></i>
           <div className={getToatlCartAmount()==0?'':'dot'}></div>
           </Link>
            </div>
           
{
  !token 
      ? <button className='login-button' style={{cursor:'pointer'}} onClick={()=>setshowlogin(true)}>Login</button>
      : <div className='navbar-profile'>
          <img className='profile' src={assets.profile_icon} alt=''/>
          <ul className='nav-profile-dropdown'>
              <Link to='/myorders'><li className='orders'><i class="ri-shopping-bag-2-fill"></i><p>Orders</p></li></Link>
              <li onClick={Logout}><i class="ri-logout-box-r-fill"></i><p>Logout</p></li>
          </ul>
      </div>
}

           
            </div>
    </div>
  </>
  )
}

export default Navbar