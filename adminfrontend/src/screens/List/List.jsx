import React from 'react'
import axios from 'axios'
import './List.css'
import {toast} from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
const List = ({url}) => {
  const [list,setlist] = useState([])

  const fetchlist =async ()=>{
    try{
      const res = await axios.get(`${url}/api/food/list`)
      // console.log(res.data.data);
      setlist(res.data.data)
    }
    catch(error){
      toast.error(error.message)
    }
      
  }

  useEffect(()=>{
    fetchlist()
  },[list])

  const handleRemoveitem = async (id)=>{
   try{
      const res = await axios.delete(`${url}/api/food/remove?id=${id}`)
      toast(res.data)
   }
   catch(error){
      toast.error(error.message)
   }

  }

  return (
    <section className='foodlist-sec'>
  <h3>All Foods List</h3>
  <div className='card-list'>
    {
      list.map((item, i) => (
        <div key={i} className='food-card'>
          <img src={`${url}/image/${item.image}`} alt={item.name} />
          <div className='card-details'>
            <h4>{item.name}</h4>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
          </div>
          <button onClick={() => handleRemoveitem(item._id)} className='remove-btn'>
            <i className="ri-close-line"></i> 
          </button>
        </div>
      ))
    }
  </div>
</section>

  )
}

export default List