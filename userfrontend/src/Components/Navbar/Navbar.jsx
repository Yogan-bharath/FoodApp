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
            <Link style={{color:'black'}} to='/'><li key={1} className='Home'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg><a>Home</a></li></Link>
            <li key={2} className='Menu'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg><a href='#menu'>Menu</a></li>
           <li  key={3} className='Contact-Us'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7H24V9H19V7ZM17 12H24V14H17V12ZM20 17H24V19H20V17ZM2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11Z"></path></svg><a href='#footer'>Contact Us</a></li>
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
