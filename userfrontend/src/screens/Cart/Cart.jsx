import React, { useContext } from 'react'
import {StoreContext} from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import Footer from '../../Components/Footer/Footer';
const Cart = () => {
  const {food_list,
          cartItems,
          addToCart,
          removeFromCart,getToatlCartAmount,url} = useContext(StoreContext)
  const navigate =  useNavigate();
  return (
    <section className='cart'>
      <section className='cart-items-title'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </section><br/><hr/>
      {food_list.map((item,index)=>{
        if(cartItems[item._id]>0){
          return (
            <>
            <div key={index} className='cart-items-item'>
              <img className='food-img' src={`${url}/image/${item.image}`}/>
              <p>{item.name}</p>
              <p>₹ {item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹ {cartItems[item._id]*item.price}</p>
              <div className='add-rem'> 
                <img className='minus' src={assets.remove_icon_red} onClick={()=>{removeFromCart(item._id)}}/>
                 {cartItems[item._id]} 
                 <img  className="plus" src={assets.add_icon_green} onClick={()=>{addToCart(item._id)}}/>
                 </div>
            </div>
            <hr/>
            </>
          )
        }

      })}
      <section className='cart-bottom'>
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
          <button className='proceed' onClick={()=>{navigate('/PlaceOrder')}}>Proceed to Checkout</button>
        </div>
        <div className='cart-promocode'>
          <h2>If You Have a Promo Code ,Enter it Here</h2>
          <div className='cart-promodoce-input'>
            <input type='text' placeholder='Enter Promo Code'/>
            <button className='apply'>Apply</button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Cart