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
      < div className='flex flex-col sm:flex-row gap-4 '>
        <img className='rounded-xl h-48 w-[300px]' src={serviceInfo.image} alt=''/>
        <div className='flex flex-col m-2 gap-4 '>
          <p className='text-sky-400'>{serviceInfo.serviceName}</p>
          <p className='font-bold text-2xl'>{serviceInfo.name}</p>
          <p>🕜Available 7:00 AM to 8:00 PM </p>
          <p>✉️taskbazaar@gmail.com</p>
        </div>
      </div>
      

      <div className=' mt-8 font-medium text-gray-700 flex flex-col items-center'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-auto sm:overflow-visible whitespace-nowrap mt-4'>
          {
            serviceSlots.length && serviceSlots.map((item,index)=>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#d86e7c] text-white' : 'border border-gray-700'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'> 
          {serviceSlots.length && serviceSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? ' bg-[#d86e7c] text-white': 'text-gray-700 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='bg-[#d86e7c]  text-white text-sm font-light px-14 py-3 w-fit rounded-full my-6'>Book Service</button>
      </div>
    </div>
  )
}

export default Booking
