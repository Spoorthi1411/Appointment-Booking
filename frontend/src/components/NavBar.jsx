import React, { useState } from 'react'
import { asserts } from '../assets/asserts'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false);
    const [token,setToken]=useState(true);

  return (
    <div className='flex items-center justify-between text-sm '>
      <div className='flex m-5 items-center'>
        <img src={asserts.logo} alt="" className='w-32 h-25 '/>
        <h2 className='text-[#d86e7c] font-bold text-3xl cursor-default
        '>TaskBazaar</h2>
      </div>
      <ul className='hidden md:flex items-start
      gap-20 font-semibold m-5'>
        <NavLink to={'/'}>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-[#d86e7c] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/services'}>
            <li className='py-1'>SERVICES</li>
            <hr className='border-none outline-none h-0.5 bg-[#d86e7c] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/about'}>
            <li className='py-1'>ABOUT US</li>
            <hr className='border-none outline-none h-0.5 bg-[#d86e7c] w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div>
        {token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
          <FontAwesomeIcon icon={faCircleUser}  className="text-3xl text-[#d86e7c]"/>
          <FontAwesomeIcon icon={faAngleDown}/>
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-20 hidden group-hover:block'>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate('/my-bookings')} className='hover:text-black cursor-pointer'>My Bookings</p>
              <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
        </div> : <button onClick={()=>navigate('/login')} className='bg-[#d86e7c] p-3 rounded-full border-black border-1 text-white font-semibold hidden md:block'>Create Account</button>}
      </div>
    </div>
  )
}

export default NavBar
