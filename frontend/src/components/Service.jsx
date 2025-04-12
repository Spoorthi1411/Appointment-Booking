import React from 'react'
import { ServicesData } from '../assets/asserts';
import { Link } from 'react-router-dom';
import { faBroom, faTools, faPaintRoller, faTruckMoving, faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Service = () => {
  const iconMap={
    Cleaning: faBroom,
    Painting:faPaintRoller,
    Repair:faTools,
    Shifting:faTruckMoving,
    Electricity:faBolt,
  };
  
  return (
    <div>
        <div className='flex gap-5 m-10 items-center justify-evenly'>
            {ServicesData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} to={`/services/${item.serviceName.toLowerCase()}`} key={index} className='flex flex-col items-center  flex-shrink-0 hover:translate-y-[-8px] transition-all duration-500'>
                    <FontAwesomeIcon icon={iconMap[item.serviceName]} className='size-8 bg-[#d86e7c] p-3 text-[#f7efe9] rounded-md'/>
                    <p className='font-medium text-center'>{item.serviceName}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Service
