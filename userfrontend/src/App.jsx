import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './screens/Home/Home'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Cart from './screens/Cart/Cart'
import {useState} from 'react'
import {ToastContainer} from 'react-toastify'
import './App.css'
import Loginpopup from './Components/Loginpopup/Loginpopup'
import Verify from './screens/Verify/Verify'
import MyOrders from './screens/MyOrders/MyOrders'
import Footer from './Components/Footer/Footer'
const App = () => {
  const [showlogin,setshowlogin] = useState(false);
 
  return (
  <div id='main'> 

  <ToastContainer/>
     {  showlogin ? <Loginpopup setshowlogin={setshowlogin}/>:<></>}
    <div className='app'>
      <Navbar showlogin={showlogin} setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
        <Route path='verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      <Footer/>
    </div>
  </div>
  )
}
// Delicious Meals Delivered Fast
export default App