import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBroom,faPaintRoller,faTools,faTruckMoving, faBolt} from "@fortawesome/free-solid-svg-icons";

const Services = () => {

  const {category} = useParams();
  const {employees} = useContext(AppContext);
  const [filterEmployees,setFilterEmployees] = useState([]);
  const navigate = useNavigate();
  const [showCategories,setShowCategories] = useState(false);

  const applyFilter = () =>{
    if(category){
      setFilterEmployees(
        employees.filter(emp => emp.category?.toLowerCase() === category.toLowerCase())
      );
    }else{
      setFilterEmployees(employees);
    }
  };
  
  useEffect(()=>{
    applyFilter();
  },[employees,category]);

  return(
    <div className="flex flex-row">
      <button
        className={`py-1 px-3 border rounded text-lg font-semibold transition-all sm:hidden ${
          showCategories ? 'bg-[#886060] text-[#ebe0d9]' : ''
        }`}
        onClick={() => setShowCategories(prev => !prev)}
      >
        Category
      </button>
      <div className={`mt-4 p-4 flex-col gap-4 text-sm text-[#6c4141] ${showCategories ? 'flex' : 'hidden sm:flex'}`}>
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
      <div className='items-center w-full'>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>

        {/* Grid of services */}
        <div className="pl-4 w-full grid grid-cols-auto gap-4">
          {filterEmployees.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">{item.serviceName}</p>
                <p className="text-md font-semibold text-green-600">
                  ₹{item.fees}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                    item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => navigate(`/booking/${item._id}`)}
                  className="w-full py-2 rounded-full bg-[#d86e7c] text-white font-medium hover:bg-[#c65d6d]"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services;
