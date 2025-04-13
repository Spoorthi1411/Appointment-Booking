import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { BusinessList } from '../assets/asserts'

const Booking = () => {
  const {servicetype}=useParams()
  const {BusinessList}=useContext(AppContext)

  const [workInfo,setworkInfo] = useState(null)

  const fetchSpecificWork =async()=>{
    const workInfo =BusinessList.find(work => work.name === servicetype)
    setworkInfo(workInfo)
  }

  useEffect(()=>{
    fetchSpecificWork()
  },[BusinessList,servicetype])

  return workInfo && (
    <div>
      {workInfo ? (
        <div>
          <div>
            <img src={workInfo.image} alt=''/>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Booking
