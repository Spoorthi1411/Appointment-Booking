import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, useNavigate } from 'react-router-dom'

const RelatedServices = ({category,employeeId}) => {
    const {BusinessList} = useContext(AppContext)
    const [relService,setRelService] = useState([]) 
    const navigate = useNavigate()
    useEffect(()=>{
        if(BusinessList.length >0 && category){
            const employeesData = BusinessList.filter((employee) => employee.category === category && employee._id!=employeeId)
            setRelService(employeesData)
        }
    },[BusinessList,category,employeeId])
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1></h1>
            <p></p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relService.slice(0,5).map((item,index)=>(
                    <div onClick={()=>{navigate(`/booking/${item._id}`);scrollTo(0,0)}} className='border border-gray-200'>
                        <img className='bg-blue-50' src={item.image} alt='' />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'><p>Available</p></p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={()=>{navigate('/BusinessList');scrollTo(0,0)}} className='bg-blue-50 '></button>
        </div>
  )
}

export default RelatedServices
