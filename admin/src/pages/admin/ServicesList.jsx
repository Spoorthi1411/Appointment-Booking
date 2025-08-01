import React, {useState, useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBroom,faPaintRoller,faTools,faTruckMoving, faBolt} from "@fortawesome/free-solid-svg-icons";

const ServicesList = () => {

    const {category}=useParams();
    const [filterEmployees,setFilterEmployees]=useState([])
    const [showCategories,setShowCategories] = useState(false)
    const navigate=useNavigate();

    const {employees,aToken,getAllEmployees,changeAvailability} = useContext(AdminContext);

    const applyFilter = () => {
      if (category) {
        setFilterEmployees(
          employees.filter(
            emp => emp.category?.trim().toLowerCase() === category.trim().toLowerCase()
          )
        );
      } else {
        setFilterEmployees(employees);
      }
    };

    useEffect(() => {
      if (aToken) {
        getAllEmployees();
      }
    }, [aToken]);

    useEffect(() => {
      applyFilter();
    }, [employees, category]);


  return (
    <div>
      <div className="m-5 max-h-[90vh] overflow-y-scroll flex flex-col sm:flex-row lg:items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-lg font-semibold transition-all sm:hidden ${showCategories ? 'bg-[#886060] text-[#ebe0d9]' : ''}`} onClick={() => setShowCategories(prev => !prev)}> Category </button>
        <div className={`flex-col ml-2 gap-4 text-sm text-[#6c4141] ${showCategories ? 'flex' : 'hidden sm:flex'}`}>
            <div onClick={() => navigate('/service-list/cleaning')} className={`flex w-60vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className="text-2xl text-[#6c4141]" icon={faBroom} />
              <p>Cleaning</p>
            </div>
            <div onClick={() => navigate('/service-list/repair')} className={`flex w-60vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className="text-2xl text-[#6c4141]" icon={faTools} />
              <p>Repair</p>
            </div>
            <div onClick={() => navigate('/service-list/painting')} className={`flex w-94vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className="text-2xl text-[#6c4141]" icon={faPaintRoller} />
              <p>Painting</p>
            </div>
            <div onClick={() => navigate('/service-list/shifting')} className={`flex w-94vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className="text-2xl text-[#6c4141]" icon={faTruckMoving} />
              <p>Shifting</p>
            </div>
            <div onClick={() => navigate('/service-list/electricity')} className={`flex w-94vw sm:w-auto pl-3 py-1.5 pr-16 gap-2 text-lg border border-[#754848] bg-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-red-900`}>
              <FontAwesomeIcon className="text-2xl text-[#6c4141]" icon={faBolt} />
              <p>Electricity</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/service-list')}
                className="flex w-fit text-center px-3 py-1 gap-2 text-lg border bg-[#886060] border-[#ebe0d9] text-[#ebe0d9] rounded transition-all cursor-pointer hover:shadow-md hover:shadow-gray-400"
              >
                All
              </button>
            </div>
        </div>

        <div className="w-full grid grid-cols-auto gap-2 gap-y-2">
          {filterEmployees.map((emp, index) => (
            <div className="w-40 h-60 border m-2  rounded-xl justify-center items-center overflow-hidden" key={index}>
                <img className="w-full rounded-md h-36 object-cover" src={emp.image} alt="" />
                  <div className="m-1">
                    <p className="font-bold mb-1">{emp.name}</p>
                    <div className="flex items-center text-sm text-center gap-1">
                      <p className="">{emp.serviceName}</p>
                      <p className='text-gray-400  text-sm'>({emp.category})</p>
                    </div>
                  </div>
                  <div className='m-1 mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={()=>changeAvailability(emp._id)} type='checkbox' checked={emp.available}/>
                    <p>Available</p>
                  </div>
                  {/* <button className="text-center w-full text-black text-base font-medium hover:cursor-pointer hover:underline">View Details</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesList
