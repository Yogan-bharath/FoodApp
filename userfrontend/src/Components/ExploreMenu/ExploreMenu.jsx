import React, { useState } from 'react'
import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'
const ExploreMenu = ({category,setcategory}) => {
    console.log(category);
    const handleclick = (item,e)=>{
       const categoryitem = category === item ? 'all': item;
        console.log(categoryitem);
       setcategory(categoryitem)
    }
  return (
    <div className='exprole-div' id='menu'>
        <div className='explore-h1'>
            <h1>Explore Menu</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, quo fugiat deserunt possimus officiis quas aperiam veritatis illo rem labore.</p>
        </div>
        <div className='menu-list'>
            {menu_list.map((item,index)=>(  
                    <div onClick={()=>{handleclick(item.menu_name)}} key={index} className='menu-list-item'>
                        <img src={item.menu_image}/>
                        <p>{item.menu_name}</p>
                    </div>   
            ))}
        </div>
    </div>
  )
}

export default ExploreMenu