import React, { useEffect } from 'react'
import './Verify.css'
import Loader from '../../Components/Loader/Loader'
import { useContext} from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useSearchParams , useNavigate} from 'react-router-dom'
const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get('orderId')
    const navigate = useNavigate()
    const {url} = useContext(StoreContext)

    const verifyPayment = async()=>{
        try{
            const res = axios.post(`${url}/api/order/verify`,{success,orderId})
            if(res.data.message=='Not Paid')
                navigate('/')
            else {
                navigate('/myorders')
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <>
    <Loader/>
    </>
  )
}

export default Verify