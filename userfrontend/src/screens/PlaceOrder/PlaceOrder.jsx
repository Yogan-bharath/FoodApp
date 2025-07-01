import React, { useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer/Footer';
const PlaceOrder = () => {
   const navigate = useNavigate()
  const [data,setdata] = useState({
    first_name:'',
    last_name:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zip_code:'',
    country:'',
    phone:''
  })
  const {getToatlCartAmount,food_list,cartItems,url,token} = useContext(StoreContext)

  const handleChange = (e)=>{
      const {name,value} = e.target
      setdata(prevdata=>({...prevdata,[name]:value}))
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    let orderItem = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo.quantity = cartItems[item._id]
        orderItem.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItem,
      amount:getToatlCartAmount()+20
    }
    try{
      let res = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
      const {session_url} = res.data
      window.location.replace(session_url)
    }
    catch(error){
      console.log(error);
    }

  }

  useEffect(()=>{
    if(!token){
      navigate('/Cart')
      toast("🔐 Login required to access this page")
    }
    else if(getToatlCartAmount()===0){
      navigate('/Cart')
      toast("🛒 No items in your cart")
    }
  },[token])


  return (
    <section className='order'>
    <form onSubmit={onSubmitHandler}>
      <div className='palce-order-left'>
        <h1>Delivery Information</h1>
        <div className='multi-fields'> 
          <input required onChange={handleChange} name='first_name' value={data.first_name} type="text" placeholder='First Name' />
          <input required onChange={handleChange} name='last_name' value={data.last_name} type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={handleChange} name='email' value={data.email} type='email' placeholder='Email address' />
        <input required onChange={handleChange} name='street' value={data.street} type='text' placeholder='Street'/>
        <div className='multi-fields'> 
          <input required onChange={handleChange} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={handleChange} name='state' value={data.state} type="text" placeholder='State'/>
        </div>
        <div className='multi-fields'> 
          <input required onChange={handleChange} name='zip_code' value={data.zip_code} type="text" placeholder='Zip Code' />
          <input required onChange={handleChange} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={handleChange} name='phone' value={data.phone} type='text' placeholder='Phone' />
      </div>
    <div className='cart-total'>
          <h1>Cart Total</h1>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getToatlCartAmount()}</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery Free</p>
              <p>₹{!getToatlCartAmount()?0:20}</p>
            </div>
            <div className='cart-total-details'>
              <p>Total</p>
              <p>₹{!getToatlCartAmount()?0:getToatlCartAmount()+20}</p>
            </div>
          </div>
          <button type='submit' className='proceed' >Proceed to Payment</button>
        </div>
    </form>
    </section>
    
  )
}

export default PlaceOrder