import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faHouse, faListUl, faSquarePlus } from '@fortawesome/free-solid-svg-icons' 

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/admin-dashboard'}>
              <FontAwesomeIcon icon={faHouse} />
              <p>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/all-appointments'}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <p>Appointments</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/add-service'}>
              <FontAwesomeIcon icon={faSquarePlus} />
              <p>Add Service</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#d86e7c]' : ''}`} to={'/service-list'}>
              <FontAwesomeIcon icon={faListUl}/>
              <p>Services list</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
