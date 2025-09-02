import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedServices = ({ category, employeeId }) => {
  const { employees } = useContext(AppContext)
  const [relService, setRelService] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (employees.length > 0 && category) {
      const employeesData = employees.filter(
        (employee) => employee.category === category && employee._id !== employeeId
      )
      setRelService(employeesData)
    }
  }, [employees, category, employeeId])

  return (
    <div className='flex flex-col w-full lg:w-1/2 items-center gap-6 mt-4 text-gray-900 md:mx-10'>
      <h2 className='text-xl font-semibold text-gray-600'>Related Services</h2>
      <p className='text-gray-600 text-sm'>You may also be interested in</p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {relService.slice(0, 5).map((item) => (
          <div
            key={item._id}
            onClick={() => { navigate(`/booking/${item._id}`); scrollTo(0,0) }}
            className='border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition'
          >
            <img className='w-full h-40 object-cover bg-blue-50' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500 mb-2'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <span>Available</span>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/services'); scrollTo(0,0) }}
        className='mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition'
      >
        View All
      </button>
    </div>
  )
}

export default RelatedServices