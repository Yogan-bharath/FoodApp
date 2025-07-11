import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'
import './Add.css'
const Add = ({url}) => {
  const [image,setImage] = useState(false)
  const [data,setdata] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  function handleform(e){
      const {name,value} = e.target
      setdata(data=>({...data,[name]:value}))
      // console.log(data);
   }
   const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        formData.append('image',image)
       try{
         const res = await axios.post(`${url}/api/food/add`,formData)
         toast(res.data.message)
        setdata({
    name:"",
    description:"",
    price:"",
    category:"Salad"
                })
                setImage(false)
       }
       catch(error){
          toast.error(error.message)
       }
   }
  return (
    <section className='screen'>
      <div className="container">
        <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className='add-img-upload'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' required hidden/>
        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input value={data.name} onChange={handleform} type='text' name='name' placeholder='Type here' required/>
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea value={data.description} onChange={handleform} name='description' rows='8' placeholder='write content here' required></textarea>
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select name='category' value={data.category} onChange={handleform}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input value={data.price} onChange={handleform} type='Number' name='price' placeholder='₹150' required/>
          </div> 
        </div>
         <button className='add-btn' type='submit'>Add Product
</button>
      </form>
      </div>
    </section>
  )
}

export default Add