import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faHouse, faListUl, faSquarePlus } from '@fortawesome/free-solid-svg-icons' 
import { ServiceContext } from '../context/ServiceContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(ServiceContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/admin-dashboard'}>
              <FontAwesomeIcon icon={faHouse} />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/all-appointments'}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/add-service'}>
              <FontAwesomeIcon icon={faSquarePlus} />
              <p className='hidden md:block'>Add Service</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/service-list'}>
              <FontAwesomeIcon icon={faListUl}/>
              <p>Services list</p>
            </NavLink>
        </ul>
      }
      {
        dToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/service-dashboard'}>
              <FontAwesomeIcon icon={faHouse} />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/service-appointments'}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/service-profile'}>
              <FontAwesomeIcon icon={faListUl}/>
              <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
