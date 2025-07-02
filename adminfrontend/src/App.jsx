import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import {ToastContainer} from 'react-toastify'
const App = () => {
  const url = `https://foodapp-backend-k1ek.onrender.com`

  return (
    <>
    <section className='app'>
      <ToastContainer/>
    <Navbar/>
    <section className='app-content'>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Add url={url}/>}/>
      <Route path='/add' element={<Add url={url}/>}/>
      <Route path='/list' element={<List url={url}/>}/>
      <Route path='/orders' element={<Orders url={url}/>}/>
    </Routes>
    </section>

    </section>
    </>
  )
}

export default App
