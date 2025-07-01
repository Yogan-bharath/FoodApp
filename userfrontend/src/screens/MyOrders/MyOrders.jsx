import React from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'
import { assets } from '../../assets/assets'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import Footer from '../../Components/Footer/Footer'
const MyOrders = () => {
    const [data,setdata] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const {url,token,settoken} = useContext(StoreContext)

    const fetchOrders = async()=>{
        try {
            const res = await axios.get(`${url}/api/order/userorders`,{headers:{token}})
            setdata(res.data.data)
        } catch (error) {
            console.log("Error Fetching orders",error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])
    if(isLoading)
        return <Loader/>

  return (
    <div>
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order,index)=>{
                        return (
                            <div key={index} className="my-orders-order">
                                   <img src={assets.parcel_icon} alt=''/>
                                   <p>
                                    {
                                        order.items.map((item,itemIndex)=>{
                                            if(itemIndex===order.items.length-1){
                                                return item.name+" x "+item.quantity
                                            }
                                            else{
                                                return item.name+" x "+item.quantity+", "
                                            }
                                        })

                                    }
                                    </p> 
                                    <p><b>Price : </b>₹{order.amount}</p>
                                    <p><b>Items : </b>{order.items.length}</p>
                                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                    {order.status=='Delivered'?'':(<button onClick={fetchOrders}>Track Order</button>)}
                                    
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default MyOrders