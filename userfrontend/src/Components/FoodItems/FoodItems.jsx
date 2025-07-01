import React, { useContext } from 'react'
import './FoodItems.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const FoodItems = ({category}) => {
  const {cartItems,setcartItems,addToCart,removeFromCart,food_list,url} = useContext(StoreContext);
  return (
    <div className='food-items'>
        {food_list.map((item,index)=>{
          if(item.category===category || category =='all'){
            return(
              <div className='food-item'>
                <img className='card-top-img' src={`${url}/image/${item.image}`}/>
                <div className='card-middle'>
                  <h3 className='title'>{item.name}</h3>
                  <p>Category - <sapn className='cat'> • {item.category}</sapn></p>
                  <p>{item.description}</p>
                  <div className='card-bottom'>
                    <p style={{display:'inline'}}>₹{item.price}</p>
                    <div className='items-add-remove'>
                    { !cartItems[item._id] ? <ul className='card-cart-btn' onClick={()=>{addToCart(item._id)}}><li><a><i class="ri-shopping-bag-line"></i>  Add to cart</a></li></ul>
                                    :<div className='add-remove'> <img className='minus' src={assets.remove_icon_red} onClick={()=>{removeFromCart(item._id)}}/> {cartItems[item._id]} <img  className="plus" src={assets.add_icon_green} onClick={()=>{addToCart(item._id)}}/></div>}
                        </div>
                  </div>
                </div>
            </div>
            )
          }
})}


    </div>
  )
}

export default FoodItems