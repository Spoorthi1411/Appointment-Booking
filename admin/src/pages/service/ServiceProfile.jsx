import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ServiceProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { dToken, profileData, setProfileData, getProfileData } = useContext(ServiceContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/employee/update-profile', updateData, { headers: { 'dToken': dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
        console.log(data.message);
        
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <div>
      <div className='flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto mt-6 ml-6'>

        {/* Profile Image Section */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="relative group">
            <img
              className='w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl'
              src={profileData.image}
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Info Section */}
        <div className='flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-xl'>

          {/* Name and Title */}
          <div className="mb-6">
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              {profileData.name}
            </h1>
            <div className='flex flex-wrap items-center gap-3 text-gray-700'>
              <div className="flex items-center gap-2 bg-[#d86e7c]/10 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-[#d86e7c] rounded-full"></div>
                <span className="font-medium">Service: {profileData.serviceName}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#d86e7c]/10 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-[#d86e7c] rounded-full"></div>
                <span className="font-medium">Category: {profileData.category}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className='text-lg font-semibold text-gray-600 mb-3 flex items-center gap-2'>
              <div className="w-1 h-6 bg-[#d86e7c] rounded-full"></div>
              Description
            </h3>
            <p className='text-gray-700 leading-relaxed max-w-2xl bg-gray-50 p-4 rounded-xl border border-gray-200'>
              {profileData.description}
            </p>
          </div>

          {/* Appointment Fee */}
          <div className="mb-6">
            <div className="bg-[#d86e7c]/10 p-4 rounded-xl border border-[#d86e7c]/20">
              <p className="text-sm font-medium text-gray-700 mb-1">Appointment Fee</p>
              <p className="text-xl font-bold text-gray-800">
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d86e7c]/50 outline-none text-gray-800"
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </p>
            </div>
          </div>


          {/* Availability Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                  checked={profileData.available}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-12 h-6 peer-focus:ring-2 peer-focus:ring-[#d86e7c]/40 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d86e7c]"></div>
              </div>
              <span className="font-medium group-hover:text-[#d86e7c] transition-colors">
                Available for appointments
              </span>
            </label>
          </div>

          {
            isEdit
              ? <button onClick={updateProfile} className="bg-[#d86e7c] hover:bg-[#c55c6b] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Save Profile
              </button>
              : <button onClick={() => setIsEdit(true)} className="bg-[#d86e7c] hover:bg-[#c55c6b] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
          }


        </div>
      </div>
    </div>
  );



}
export default ServiceProfile