import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from './pages/Login';
import About from './pages/About';
import Contact from "./pages/Contact";
import MyProfile from './pages/MyProfile';
import MyServices from './pages/MyServices';
import Booking from './pages/Booking';
import NavBar from './components/NavBar';
import Footer from './components/footer';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/services/:serviceName' element={<Services/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-services' element={<MyServices/>}/>
        <Route path='/booking/:servicetype' element={<Booking/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App

