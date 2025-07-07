import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBroom,faPaintRoller,faTools,faTruckMoving, faBolt} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
    const {serviceName}=useParams();
    const [filterService,setFilterService]=useState([])
    const [showCategories,setShowCategories] = useState(false)
    const navigate=useNavigate();

    const {services} = useContext(AppContext);
    const applyFilter = () =>{
      if(serviceName){
        setFilterService(services.filter(category => category.serviceName.toLowerCase() === serviceName.toLowerCase()))
      } else{
        setFilterService(services)
      }
    }

    useEffect(()=>{
      applyFilter()
    },[services,serviceName])

  return (
    <div>
      <div>
        <div className='flex flex-col sm:flex-row lg:items-start gap-5 mt-5 '>
          <button className={`py-1 px-3 border rounded text-lg font-semibold transition-all sm:hidden ${showCategories ? 'bg-[#886060] text-[#ebe0d9]' : ''}`} onClick={()=>setShowCategories(prev => !prev)}>Category</button>
          <div className={` flex-col gap-4 text-sm text-[#6c4141] ${showCategories ? 'flex' : 'hidden sm:flex'}`}>
            <div onClick={()=>navigate('/services/cleaning')} className={`flex w-94vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
            <FontAwesomeIcon className='text-2xl text-[#6c4141]' icon={faBroom} />
              <p>Cleaning</p> 
            </div>
            <div onClick={()=> navigate('/services/repair')} className={`flex w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className='text-2xl text-[#6c4141]' icon={faTools} />
              <p>Repair</p>
            </div>
            <div  onClick={()=>navigate('/services/painting')} className={`flex w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className='text-2xl text-[#6c4141]' icon={faPaintRoller} />
              <p>Painting</p>
            </div>
            <div  onClick={()=>navigate('/services/shifting')}className={`flex w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className='text-2xl text-[#6c4141]' icon={faTruckMoving} />
              <p>Shifting</p>
            </div>
            <div onClick={()=> navigate('/services/electricity')} className={`flex w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className='text-2xl text-[#6c4141]' icon={faBolt} />
              <p>Electricity </p>
            </div>
            <div className='flex justify-center'>
              <button onClick={()=>navigate('/services')} className='flex w-fit text-center px-3 py-1 gap-2 text-lg border bg-[#886060] border-[#ebe0d9] text-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-gray-400'>All</button>
            </div>
          </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterService.map((item,index)=>(
              <div onClick={()=>navigate(`/booking/${item.name}`)} className='border m-2 shadow-lg shadow-slate-500 rounded-xl justify-center items-center overflow-hidden cursor-pointer ' key={index}>
                <img className='w-full h-48 rounded-md' src={item.image} alt=''/>
                <div className='p-4 '>
                  <div className='flex items-center gap-2 text-sm text-center text-sky-400'>
                    <p className=''>{item.serviceName}</p>
                  </div>
                  <p className='font-bold'>{item.name}</p>
                </div>
                <button className='w-[calc(100%-20px)] mx-[10px] mb-3 border-solid p-2 rounded-full bg-[#d86e7c] text-white text-base font-medium'>Book Now</button>
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default Services
