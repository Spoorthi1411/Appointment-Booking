import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const MyServices = () => {

  const {backendUrl,token,getEmployeesData} = useContext(AppContext)

  const [services,setServices] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserBookings = async()=>{
    try {
      
      const {data} = await axios.get(backendUrl+'/api/user/services',{headers:{token}})

      if(data.success){
        setServices(data.services.reverse())
        console.log(data.services);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(bookingId)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/user/cancel-booking',{bookingId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserBookings()
        getEmployeesData()
      }else{
        toast.error(data.message)
      }
    
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserBookings()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Bookings</p>
      <div>
        {services.map((item,index)=>(
          !item.cancelled && (<div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='h-20 w-20 bg-indigo-50' src={item.employeeData.image} alt=''/>
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.employeeData?.name || 'No Name'}</p>
              <p>{item.employeeData.serviceName}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-slate-800 hover:text-white transition-all duration-300'>Pay Online</button>
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Booking</button>}
            </div>
          </div>
          )
        ))}
      </div>
    </div>
  )
}

export default MyServices
