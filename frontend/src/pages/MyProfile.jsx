import React,{useState} from 'react'
import {asserts} from '../assets/asserts'

const MyProfile = () => {

  const [userData,setUserData] = useState({
    name:"Saketh",
    image:asserts.profile,
    email:'saketh@gmail.com',
    phone:'+1 123 456 7890',
    address:{
      line1:"5th cross,shyampet",
      line2:"Circle,Hanamkonda,Telangana",
    },
    gender:'Male',
    dob:'2005-05-14'
  })

  const [isEdit,setIsEdit] = useState(false)
  return (
    <div className='w-full flex gap-10 text-sm lg:flex-row'>
      <img className='w-36 rounded h-36' src={userData.image} alt=''/>
      <div className='w-1/2'>
        {
          isEdit 
          ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p> 
        }
        <hr className='bg-zinc-400 h-[1px] border-none'/>
        <div className='flex justify-between'>
          <div>
            <p className='text-neutral-500 mt-3'>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Email id :</p>
              <p className='text-blue-800'>{userData.email}</p>
              <p className='font-medium'>Phone :</p>
            {
              isEdit 
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
              : <p className='text-blue-800'>{userData.phone}</p> 
            }
            <p className='font-medium'>Address :</p>
            {
              isEdit 
                ? <p>
                  < input className='bg-gray-100' onChange={(e)=> setUserData(prev => ({...prev,address: {...prev.address,line1: e.target.value}}))} value={userData.address.line1} type='text'/>
                  <br/>
                  <input className='bg-gray-100' onChange={(e)=> setUserData(prev => ({...prev,address: {...prev.address,line2: e.target.value}}))} value={userData.address.line2}  type='text'/>
                </p>
                : <p className='text-blue-800'>
                  {userData.address.line1}
                  <br/>
                  {userData.address.line2}
                </p> 
            }
            </div>
          </div>
          <div>
            <p className='text-neutral-500 mt-3'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Gender:</p>
              {
              isEdit 
                ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-blue-800'>{userData.gender}</p> 
              }
              <p className='font-medium'>Birthday:</p>
              {
                isEdit 
                ? <input className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} type='date'/>
                : <p className='text-blue-800'>{userData.dob}</p>
              }
            </div>
          </div>
        </div>
        <div className=''>
            {
              isEdit
              ? <button onClick={()=>setIsEdit(false)}>Save Information</button>
              : <button onClick={()=>setIsEdit(true)}>Edit</button>
            }
        </div>
      </div>
    </div>
  )
}

export default MyProfile
