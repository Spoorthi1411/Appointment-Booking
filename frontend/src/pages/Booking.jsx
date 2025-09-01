import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import RelatedServices from '../components/RelatedServices'
import axios from 'axios'


const Booking = () => {
  const {employeeId} = useParams();
  const navigate=useNavigate();
  const {employees,backendUrl,token,getEmployeesData} = useContext(AppContext)


  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [serviceInfo,setserviceInfo] =useState(null)

  const [serviceSlots,setServiceSlots] = useState([])
  const [slotIndex,setSlotIndex] =useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchServiceInfo = async () => {
    const serviceInfo = employees.find(serve => serve._id === employeeId)
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

  const bookAppointment = async()=>{
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = serviceSlots[slotIndex][0].datetime

      let day= date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "-" + month + "-" + year

      const {data} = await axios.post(backendUrl+'/api/user/book-service',{employeeId,slotDate,slotTime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getEmployeesData()
        navigate('/my-services')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  useEffect(()=>{
    fetchServiceInfo()
  },[employees,employeeId])

  useEffect(()=>{
    getAvailableSlots()
  },[serviceInfo])



  useEffect(()=>{

  },[serviceSlots])

  return serviceInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-white w-full sm:max-w-72 rounded-lg h-64' src={serviceInfo.image} alt=''/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>{serviceInfo.name}</p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
            <p className='text-base'>{serviceInfo.serviceName}</p>
          </div>
          {/*--------About Employee----------*/}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <FontAwesomeIcon icon={faCircleInfo} /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{serviceInfo.description}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Service fee: <span className='text-gray-600'>Rs.{serviceInfo.fees}</span>
          </p>
        </div>
      </div>
      <div className='lg:ml-60 sm:pl-2 mt-4 font-medium text-gray-700 text-center'>
        <p className='font-semibold text-lg'>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 justify-center'>
          {
            serviceSlots.length && serviceSlots.map((item,idx)=>(
              <div onClick={()=>setSlotIndex(idx)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === idx ? 'bg-[#d86e7c] text-white': 'border border-gray-200'}`} key={idx}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div id="slot-scroll" className="flex items-center justify-start w-full overflow-x-auto mt-4 px-4 scrollbar-thin scrollbar-thumb-gray-300" > 
          <div className="flex min-w-max gap-3 "> 
            {serviceSlots.length > 0 && serviceSlots[slotIndex]?.length > 0 ? ( serviceSlots[slotIndex].map((item, index) => ( 
              <p key={index} onClick={() => setSlotTime(item.time)} className={`text-sm font-medium flex-shrink-0 px-6 py-2 rounded-full cursor-pointer capitalize ${item.time === slotTime ? 'bg-[#d86e7c] text-white ring-2 ring-[#b6505f]' : 'text-gray-700 border border-gray-300 bg-white'} shadow-sm hover:shadow-lg transition-all duration-150 active:scale-95 ml-2 first:ml-0 mr-2 last:mr-0`} > 
                {item.time.toLowerCase()} 
              </p> )) ) : ( <p className="text-sm text-gray-500 font-medium px-4 py-2"> No slots available for this day </p> )} 
          </div> 
        </div>
        <button onClick={bookAppointment} className='mt-4  bg-[#d86e7c] text-white text-sm font-light px-14 py-3 rounded-full '>Book Service</button>
      </div>
      {/*--------Related Services-------*/}
      <RelatedServices  employeeId={employeeId} category={serviceInfo.category} />
    </div>
  )
}

export default Booking



