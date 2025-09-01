import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { BusinessList } from '../assets/asserts'
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { toast } from 'react-toastify'

const Booking = () => {
  const {servicetype} = useParams();
  const navigate=useNavigate();
  const {BusinessList, currencySymbol, backendUrl, token, getEmployeesData} = useContext(AppContext)
  const controls = useAnimation();

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

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
  }

  useEffect(()=>{
    fetchServiceInfo()
  },[BusinessList,servicetype])

  useEffect(()=>{
    getAvailableSlots()
  },[serviceInfo])


  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  useEffect(()=>{

  },[serviceSlots])

  return serviceInfo && (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
    >
      {/*-------------service details-----------*/}
      < div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start mt-6'>
        <img className='rounded-xl w-[320px] m-2 h-64' src={serviceInfo.image} alt=''/>
        <div className='flex flex-col m-2 gap-2 border-2 border-gray-400 p-1 rounded-sm '>
          <p className='text-sky-500 font-medium uppercase tracking-wide'>{serviceInfo.serviceName}</p>
          <p className='font-semibold text-3xl text-gray-800'>{serviceInfo.name}</p>
          <p className=''>Description:</p>
          <p className='font-light'>{serviceInfo.description}</p>
          <p>🕜Available 7:00 AM to 8:00 PM </p>
          <p>💵Service Fee: $50</p>
        </div>
      </div>
      

      <div className='mt-8 flex flex-col lg:flex-row gap-6'>
        {/* Left: Booking slots */}
        <div className='w-full lg:w-2/3 font-medium text-gray-700 flex flex-col items-center mr-10'>
          <p className='text-xl text-black'>Booking slots</p>

          <div className='flex gap-3 items-center justify-center w-full overflow-x-auto sm:overflow-visible whitespace-nowrap mt-4'>
            {serviceSlots.length && serviceSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index}
                className={`text-center py-3 px-4 w-20 h-20  rounded-full cursor-pointer 
                  ${slotIndex === index ? 'bg-[#d86e7c] text-white' : 'border border-gray-700'}
                  shadow-sm hover:shadow-lg transition-all duration-200`}>
                <p>{item.length > 0 ? daysOfWeek[item[0].datetime.getDay()] : daysOfWeek[(new Date().getDay() + index) % 7]}</p>
                <p>{item.length > 0 ? item[0].datetime.getDate() : new Date(new Date().setDate(new Date().getDate() + index)).getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time slot row */}
          <div
            id="slot-scroll"
            className="flex items-center justify-start w-full overflow-x-auto mt-4 px-4 scrollbar-thin scrollbar-thumb-gray-300"
          >
            <div className="flex min-w-max gap-3 ">
              {serviceSlots.length > 0 && serviceSlots[slotIndex]?.length > 0 ? (
                serviceSlots[slotIndex].map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-medium flex-shrink-0 px-6 py-2 rounded-full cursor-pointer capitalize
                      ${item.time === slotTime
                        ? 'bg-[#d86e7c] text-white ring-2 ring-[#b6505f]'
                        : 'text-gray-700 border border-gray-300 bg-white'}
                      shadow-sm hover:shadow-lg transition-all duration-150 active:scale-95 ml-2 first:ml-0 mr-2 last:mr-0`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500 font-medium px-4 py-2">
                  No slots available for this day
                </p>
              )}
            </div>
          </div>

          <button onClick={bookAppointment} className='bg-[#d86e7c] hover:bg-[#c35e6d] transition-all duration-200 text-white text-sm font-semibold px-14 py-3 w-fit rounded-full my-6 shadow-md'>
            Book Service
          </button>
        </div>

        {/* Right: Placeholder or similar businesses */}
        <div className='w-full lg:w-1/3'>
          <p className='text-xl font-semibold mb-4'>More Services</p>
          {/* Insert list or placeholder here */}
          <div>
            {serviceInfo.similarService.map((name, index) => {
              const match = BusinessList.find(item => item.name === name);
              return (
                <div className='relative flex border-2 border-gray-400 m-2 rounded-md items-center' key={index} >
                  <img className='h-20 w-24 m-1' src={match.image} alt={match.name} />
                  <div className='flex flex-col flex-grow overflow-hidden pr-10'>
                    <p className='text-base text-sky-400 '>{match.serviceName}</p>
                    <p className='text-xl mb-2 break-words whitespace-normal'>{match.name}</p>
                  </div>
                  <button
                    onClick={async () => {
                      await controls.start('exit');  // Trigger exit animation
                      navigate(`/booking/${match.name}`);
                    }}
                    className='absolute right-2 rounded-full'
                  >
                    <FontAwesomeIcon className='hover:shadow-lg transition-all hover:bg-orange-200 size-5 border-2 rounded-full border-rose-950 text-black' icon={faArrowRight}/>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Booking
