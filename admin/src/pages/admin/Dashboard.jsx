import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useState,useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {


  const { dashData, getDashData, aToken, cancelAppointment } = useContext(AdminContext)
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.employee} alt="" className="w-15" />
          <div>
            <p className='text-xl text-gray-500'>{dashData.employees}</p>
            <p className='text-gray-600'>Employees</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointment_icon} alt="" className="w-15" />
          <div>
            <p className='text-xl text-gray-500'>{dashData.appointments}</p>
            <p className='text-gray-600'>Appointments</p>
          </div>
        </div>


        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.user} alt="" className="w-15 h-15 rounded-full object-cover" />
          <div>
            <p className='text-xl text-gray-500'>{dashData.users}</p>
            <p className='text-gray-600'>Customers</p>
          </div>
        </div>

      </div>

      <div className='bg-white border border-gray-200 rounded mt-10'>

        <div className='flex items-center gap-2.5 px-4 py-5 border-b border-gray-200'>
          <img src={assets.list} alt="" className="w-4" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0 border-gray-200'>
          {dashData.latestAppointments.map((item,index) =>(
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10 h-10' src={item.employeeData.image} alt=''/>
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.employeeData.name}</p>
                <p className='text-gray-800'>{item.slotDate}</p>
              </div>
              { item.cancelled 
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer'/>
              }
            </div>
          ))}
        </div>

      </div>


    </div>
  )
}

export default Dashboard
