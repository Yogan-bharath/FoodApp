import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [food_list,setfoodlist] = useState([])
    const [cartItems,setcartItems] = useState({});
    const url = 'https://foodapp-backend-k1ek.onrender.com'
    const [token,setToken] = useState('')

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+'/api/food/list')
        setfoodlist(response.data.data)
    }

    const loadCartData = async(token)=>{
        const res = await axios.get(url+"/api/cart/get",{headers:{token}})
        setcartItems(res.data.cartData)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
    },[])


const addToCart =async (itemId)=>{
    if(!cartItems[itemId]){
        setcartItems({...cartItems,[itemId]:1})
    }
    else{
        setcartItems({...cartItems,[itemId]:cartItems[itemId]+1})
    }
    if(token){
        try{
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
        catch(error){
            console.log(error);
        }
    }
}

const removeFromCart =async (itemId)=>{
        setcartItems({...cartItems,[itemId]:cartItems[itemId]-1})

        if(token){
        try{
            await axios.delete(url+"/api/cart/remove?itemId="+itemId,{itemId},{headers:{token}})
        }
        catch(error){
            console.log(error);
        }
    }

}

const getToatlCartAmount = ()=>{
    let total = 0;
    for(let item in cartItems){
        let food = food_list.find(food=>food._id==item)
        total =  total + food.price*cartItems[item]
    }
    return total 
}

    const contextValues = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getToatlCartAmount,
        url,
        token,
        setToken
    }
  return (
    <StoreContext.Provider value={contextValues}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
