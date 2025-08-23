import React, { useContext } from 'react'
import { BusinessList } from '../assets/asserts'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Popular = () => {

  const navigate=useNavigate()
  const {BusinessList} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 md:mx-10'>
      <h1 className=' font-bold text-xl'>Popular Services</h1>
      <div className='w-full grid grid-cols-auto gap-2 pt-5 gap-y-6 px-3 sm:px-6'>
        {BusinessList.slice(0,6).map((item,index)=>(
          <div onClick={()=>navigate(`/services/${item.serviceName}`)} className='border  m-2 shadow-lg shadow-slate-500 rounded-xl justify-center items-center overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='w-full h-48 rounded-md' src={item.image} alt=''/>
            <div className='p-4 '>
              <div className='flex items-center gap-2 text-sm text-center text-sky-400'>
                <p className=''>{item.serviceName}</p>
              </div>
              <p className='font-bold'>{item.name}</p>
            </div>
            <button className='w-[calc(100%-20px)] mx-[10px] mb-3 border-solid p-2 rounded-full bg-[#d86e7c] text-white text-base font-medium'>Book Now</button>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate(`/services`);scrollTo(0,0)}} className='bg-[#d2707d] font-medium text-white px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default Popular
