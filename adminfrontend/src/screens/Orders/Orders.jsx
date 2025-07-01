import React from 'react'
import axios from 'axios'
import {assets} from '../../assets/assets'
import { useState,useEffect } from 'react'
import './Orders.css'
const Orders = ({url}) => {
  const [orders,setorders] = useState([])
  const fetchAllOrders = async()=>{
    try {
      const res = await axios.get(`${url}/api/order/list`)
      setorders(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const statusHandle = async(e,orderId)=>{
    try {
      const res = await axios.post(`${url}/api/order/status`,{orderId,status:e.target.value})
      await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className="screen order">
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order,index)=>{
            return (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon}/>
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item,itemIndex)=>{
                          if(itemIndex===order.items.length-1)
                            return item+" x "+item.quantity
                          else return item.name+" x "+item.quantity+', '
                      })}
                  </p>
                  <p className='order-item-name'>{order.address.first_name+" "+order.address.last_name}</p>
                  <div className="order-item-address">
                    <p>{order.address.street}</p>
                    <p>{order.address.city+", "+order.address.zip_code+", "},</p>
                    <p className='order-item-phone'>{order.address.phone}</p>
                  </div>
                  <p><b>Items : </b>{order.items.length}</p>
                  <p><b>Price : </b>₹{order.amount}</p>
                  <select onChange={(e)=>statusHandle(e,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders