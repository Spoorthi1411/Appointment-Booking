import React, { useState } from 'react'
import { asserts } from '../assets/asserts'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false);
    const [token,setToken]=useState(true);

  return (
    <div className='flex items-center justify-between text-sm '>
      <div className='flex m-5 items-center'>
        <img src={asserts.logo} alt="" className='w-24 h-20 lg:w-32 lg:h-25 '/>
        <h2 className='text-[#d86e7c] font-bold text-2xl lg:text-3xl cursor-default
        '>TaskBazaar</h2>
      </div>
      <ul className='hidden lg:flex items-start
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
      <div className='flex items-center w-1/6 justify-evenly'>
        {/*------Mobile Menu--------*/}
        <FontAwesomeIcon onClick={()=>setShowMenu(true)} className='w-6 lg:hidden' icon={faBars} />
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} lg:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'> 
            <div className='flex m-5 items-center'>
              <img src={asserts.logo} alt="" className='w-20 h-16'/>
              <h2 className='text-[#d86e7c] font-bold text-2xl cursor-default
              '>TaskBazaar</h2>
            </div>
            <FontAwesomeIcon className='bg-gray-600 text-white text-lg rounded-full mr-8 w-8 h-8' onClick={()=>setShowMenu(false)} icon={faCircleXmark} />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/'>Home</NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/services'>Services</NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/about'>About</NavLink>
          </ul>
        </div>
        {token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
          <FontAwesomeIcon icon={faCircleUser}  className="text-xl lg:text-3xl text-[#d86e7c]"/>
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
