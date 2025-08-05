import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeitem('aToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <div className='flex items-center'>
            <img className='w-20 h-16 lg:w-20 lg:h-16' src={assets.logo} alt=''/>
            <div>
                <p className='text-3xl font-bold text-[#d86e7c]'>TaskBazaar</p>
                <p className='text-sm'>Dashboard pannel</p>
            </div>
        </div>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-400 text-gray-500'>{aToken ? 'Admin' : 'Service'}</p>
      </div>
      <button className='bg-[#d86e7c] text-white text-sm px-10 py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar