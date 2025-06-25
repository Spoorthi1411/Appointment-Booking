import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { BusinessList } from '../assets/asserts'

const Booking = () => {
  const {servicetype} = useParams();
  const {BusinessList} = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [serviceInfo,setserviceInfo] =useState(null)

  const [serviceSlots,setServiceSlots] = useState([])
  const [slotIndex,setSlotIndex] =useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchServiceInfo = async () => {
    const serviceInfo =BusinessList.find(serve => serve.name === servicetype)
    setserviceInfo(serviceInfo)

  }

  const getAvailableSlots =async() =>{
    setServiceSlots([])

    let today = new Date()

    for(let i=0;i<7;i++){
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(20,0,0,0)

      if(today.getDate() === currentDate.getDate()){
        if (currentDate.getHours() >= 20) {
      // Already past working hours, don't create slots
          setServiceSlots(prev => [...prev, []])
          continue
        }
        currentDate.setHours(currentDate.getHours() > 7 ? currentDate.getHours()+1 : 7)
        currentDate.setMinutes(currentDate.getMinutes() > 60 ? 60 : 0)
      }else{
        currentDate.setHours(7)
        currentDate.setMinutes(0)
      }
      
      let timeSlots= []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour:'2-digit',minute:'2-digit'})

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })


        currentDate.setMinutes(currentDate.getMinutes()+60)

      }

      setServiceSlots(prev => ([...prev,timeSlots]))
    }
  }

  useEffect(()=>{
    fetchServiceInfo()
  },[BusinessList,servicetype])

  useEffect(()=>{
    getAvailableSlots()
  },[serviceInfo])


  useEffect(()=>{

  },[serviceSlots])

  return serviceInfo && (
    <div>
      {/*-------------service details-----------*/}
      < div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start mt-6'>
        <img className='rounded-xl h-48 w-[300px]' src={serviceInfo.image} alt=''/>
        <div className='flex flex-col m-2 gap-4 '>
          
          <p className='text-sky-500 font-medium uppercase tracking-wide'>{serviceInfo.serviceName}</p>
          <p className='font-semibold text-3xl text-gray-800'>{serviceInfo.name}</p>
          <p>🕜Available 7:00 AM to 8:00 PM </p>
          <p>✉️taskbazaar@gmail.com</p>
        </div>
      </div>
      

      <div className='mt-8 flex flex-col lg:flex-row gap-6'>
        {/* Left: Booking slots */}
        <div className='w-full lg:w-2/3 font-medium text-gray-700 flex flex-col items-center'>
          <p className='text-xl text-black'>Booking slots</p>

          <div className='flex gap-3 items-center justify-center w-full overflow-x-auto sm:overflow-visible whitespace-nowrap mt-4'>
            {serviceSlots.length && serviceSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index}
                className={`text-center py-3 px-4 w-20 h-20     rounded-full cursor-pointer 
                  ${slotIndex === index ? 'bg-[#d86e7c] text-white' : 'border border-gray-700'}
                  shadow-sm hover:shadow-md transition-all duration-200`}>
                <p>{item.length > 0 ? daysOfWeek[item[0].datetime.getDay()] : daysOfWeek[(new Date().getDay() + index) % 7]}</p>
                <p>{item.length > 0 ? item[0].datetime.getDate() : new Date(new Date().setDate(new Date().getDate() + index)).getDate()}</p>
              </div>
            ))}
          </div>

          <div className='flex items-center justify-center gap-3 w-full overflow-x-auto mt-4 scrollbar-thin scrollbar-thumb-gray-300'>
            {serviceSlots.length && serviceSlots[slotIndex].length?(
              serviceSlots[slotIndex].map((item, index) => (
              <p key={index} onClick={() => setSlotTime(item.time)}
                className={`text-sm font-medium flex-shrink-0 px-6 py-2 rounded-full cursor-pointer 
                  ${item.time === slotTime ? 'bg-[#d86e7c] text-white' : 'text-gray-700 border border-gray-300'}
                  shadow-sm hover:shadow-md transition-all duration-150`}>
                {item.time.toLowerCase()}
              </p>
            ))
          ):(
            <p className="text-sm text-gray-500 font-medium px-4 py-2">No slots available for this day</p>
          )}
          </div>

          <button className='bg-[#d86e7c] hover:bg-[#c35e6d] transition-all duration-200 text-white text-sm font-semibold px-14 py-3 w-fit rounded-full my-6 shadow-md'>
            Book Service
          </button>
        </div>

        {/* Right: Placeholder or similar businesses */}
        <div className='w-full lg:w-1/3'>
          <p className='text-xl font-semibold mb-4'>Similar Services</p>
          {/* Insert list or placeholder here */}
        </div>
      </div>
    </div>
  )
}

export default Booking
