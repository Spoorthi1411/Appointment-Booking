import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faPaintRoller, faTools, faTruckMoving, faBolt } from "@fortawesome/free-solid-svg-icons";

const ServicesList = () => {
  const {employees,aToken,getAllEmployees,changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllEmployees()
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All employees</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-2'>
        {
          employees.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group h-72 w-56' key={index}>
              <img className='bg-indigo-50 w-full h-40 object-cover' src={item.image}/>
              <div className='p-2'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-s,'>{item.serviceName}</p>
                <div className='mt-2 flex items-center gap-2 text-sm '>
                  <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ServicesList;

