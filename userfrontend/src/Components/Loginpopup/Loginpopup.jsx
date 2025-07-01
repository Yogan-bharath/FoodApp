import React, { useContext, useState } from 'react'
import {StoreContext} from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import './Loginpopup.css'
const Loginpopup = ({setshowlogin}) => {
    const {url,token,setToken} = useContext(StoreContext)
    const [loginstate,setloginstate] = useState('sign')
    const [data,setdata] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandle = (e)=>{
        const {name,value} = e.target
        setdata(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        let newURL = url
        if(loginstate=='sign'){
            newURL +=`/api/user/login` 
        }
        else{
            newURL +=`/api/user/register`
        }
        try{
            const res = await axios.post(newURL,data)
            if(loginstate=='login'){
                toast.success("Account created successfully! Please Log in")
                setloginstate('sign')
            }
            else{
                setToken(res.data.token)
                localStorage.setItem('token',res.data.token)
                setshowlogin(false)
            }
        }
        catch(error){
            console.log(error.response.data.message)
        }
        
    }

    console.log(loginstate);
  return (
    <div>
        <div className='login-container'>
            <div className='login-div'>
                <div className='login-head'>
                    {loginstate=='sign'? <h1 className='lors'>Login</h1>:<h1 className='lors'>Sing Up</h1> }
                    <i onClick={()=>{(setshowlogin(false))}} class="ri-close-large-line"></i>
                </div>
                <form onSubmit={onSubmitHandler} className='form'>
                    {loginstate=='login'?<input type='text' onChange={onChangeHandle} placeholder='Your Name' name='name' value={data.name}/>:<></>}
                    <input type='email' onChange={onChangeHandle} placeholder='Your Email' name='email' value={data.email} required/>
                    <input type='password' onChange={onChangeHandle} placeholder='Password' name='password' value={data.password} required/>
                    <button className='login-btn'>{loginstate=='sign'? <p className=''>Login</p>:<p className='lors'>Sign Up</p>}</button>
                    <div className='ckeck'>
                        <input type="checkbox" required/>
                        <p>By continuing . I agree to terms & privacy policy</p>
                    </div>
                </form>
                <p className='bottom'>Already have an account ?
                    <span >{loginstate=='sign'? <span onClick={()=>{setloginstate('login')}}>Sign Up here</span>:<span onClick={()=>{setloginstate('sign')}}>Login here</span>}</span></p>
            </div>
        </div>
    </div>
  )
}

export default Loginpopup