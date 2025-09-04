import React, { useContext } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


export const ServiceAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(ServiceContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium '>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll '>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Name</p>
          <p>payment</p>
          <p>Address</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p>{item.userData.address?.line1}, {item.userData.address?.line2}</p>
              <p>{item.slotDate} , {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
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

          ))
        }
      </div>
    </div>
  )
}

export default ServiceAppointments