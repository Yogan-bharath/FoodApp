import React, { useState , useRef, useEffect } from 'react'
import './Home.css';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodItems from '../../Components/FoodItems/FoodItems';
import Footer from '../../Components/Footer/Footer';
import video from '../../assets/3015488-hd_1920_1080_24fps.mp4'
import {useGSAP} from '@gsap/react'
import{ gsap } from 'gsap';
const Home = () => {
  const [category,setcategory] = useState('all')
  // const [view] = useRef(null)

  useGSAP(()=>{
        gsap.from("#left",{
            y:-200,
            opacity:0,
            duraction:.7,
            delay:.6

        })
        gsap.from("#right",{
            y:200,
            opacity:0,
            duraction:.7,
             delay:1.3

        })
  },[])
  
  return (
    <>
    <div className='header'>
        <div className='video'>
            {/* <div className='View'></div> */}
            <video src={video} loop muted autoPlay></video>
        </div>
        <div className='head-content'>
            <div class="video-heading" id='left'><h1>Delicious Meals</h1></div>
            <div class="video-heading" id='right'><h1>Delivered Fast</h1></div>
        </div>
    </div>
    <ExploreMenu category={category} setcategory={setcategory}/>
    <FoodItems category={category}/>
    </>
  )
}
// Delicious Meals Delivered Fast
export default Home