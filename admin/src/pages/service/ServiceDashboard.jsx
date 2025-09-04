import React, { useContext, useEffect } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

export const ServiceDashboard = () => {

  const { dashData, setDashData, getDashData, dToken, cancelAppointment, completeAppointment  } = useContext(ServiceContext)
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])


  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

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
            <p className='text-xl text-gray-500'>{dashData.customers}</p>
            <p className='text-gray-600'>Customers</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.earnings} alt="" className="w-15" />
          <div>
            <p className='text-xl text-gray-500'>{dashData.earnings}</p>
            <p className='text-gray-600'>Earnings</p>
          </div>
        </div>


      </div>

      <div className='bg-white border border-gray-200 rounded mt-10'>

        <div className='flex items-center gap-2.5 px-4 py-5 border-b border-gray-200'>
          <img src={assets.list} alt="" className="w-4" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div
                className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
                key={index}
              >
                {/* Profile Image */}
                <img
                  className='w-10 h-10 rounded-full object-cover border border-gray-200'
                  src={item.employeeData.image}
                  alt={item.employeeData.name}
                />

                {/* Name + Date in one line */}
                <div className='flex-1 flex items-center justify-between text-sm'>
                  <div className="flex items-center gap-4">
                    <p className='text-gray-800 font-medium'>{item.employeeData.name}</p>
                    <p className='text-gray-600'>{item.slotDate}</p>
                  </div>

                  {/* Status / Action */}
                  <div>
                    {
                      item.cancelled ? (
                        <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                      ) : item.isCompleted ? (
                        <p className='text-green-500 text-xs font-medium'>Completed</p>
                      ) : (
                        <div className='flex items-center gap-3'>
                          {/* Cancel Button */}
                          <div
                            onClick={() => cancelAppointment(item._id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition"
                          >
                            <img
                              src={assets.cancel_icon}
                              alt="Cancel"
                              className="w-4 h-4"
                            />
                          </div>

                          {/* Complete Button */}
                          <div
                            onClick={() => completeAppointment(item._id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 cursor-pointer hover:bg-green-200 transition"
                          >
                            <img
                              src={assets.tick_icon}
                              alt="Complete"
                              className="w-6 h-6"
                            />
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>




      </div>


    </div>
  )
}
export default ServiceDashboard
