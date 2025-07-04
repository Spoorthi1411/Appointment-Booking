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
      <div className='w-2/3'>
        {
          isEdit 
          ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 text-[#aba094]' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p> 
        }
        <hr className='bg-zinc-400 h-[1px] border-none'/>
        <div className='flex justify-between '>
          <div className='text-base w-1/2 mr-28'>
            <p className='text-neutral-500 mt-3'>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[2fr_4fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Email id :</p>
              <p className=' text-black'>{userData.email}</p>
              <p className='font-medium'>Phone :</p>
            {
              isEdit 
              ? <input className='bg-gray-100 max-w-52 text-[#aba094]' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
              : <p className='text-black'>{userData.phone}</p> 
            }
            <p className='font-medium'>Address :</p>
            {
              isEdit 
                ? <p>
                  < input className='bg-gray-100 text-[#aba094]' onChange={(e)=> setUserData(prev => ({...prev,address: {...prev.address,line1: e.target.value}}))} value={userData.address.line1} type='text'/>
                  <br/>
                  <input className='bg-gray-100 text-[#aba094]' onChange={(e)=> setUserData(prev => ({...prev,address: {...prev.address,line2: e.target.value}}))} value={userData.address.line2}  type='text'/>
                </p>
                : <p className='text-black'>
                  {userData.address.line1}
                  <br/>
                  {userData.address.line2}
                </p> 
            }
            </div>
          </div>
          <div className='text-base w-1/2'>
            <p className='text-neutral-500 mt-3'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[2fr_4fr] gap-y-2.5 mt-3 text-neutral-700 mr-2'>
              <p className='font-medium'>Gender:</p>
              {
              isEdit 
                ? <select className='max-w-25 bg-gray-100 text-[#aba094]' onChange={(e)=>setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-black'>{userData.gender}</p> 
              }
              <p className='font-medium'>Birthday:</p>
              {
                isEdit 
                ? <input className='max-w-25 bg-gray-100 text-[#aba094]' onChange={(e)=>setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} type='date'/>
                : <p className='text-black'>{userData.dob}</p>
              }
            </div>
          </div>
        </div>
        <div className='text-center'>
            {
              isEdit
              ? <button className='p-2 border-2 border-zinc-200 shadow-sm rounded-md bg-gray-500 text-white text-center mt-10 hover:shadow-lg shadow-slate-800' onClick={()=>setIsEdit(false)}>Save Information</button>
              : <button className='border-2 border-zinc-200 shadow-sm rounded-md bg-gray-500 text-white text-center mt-10 p-2 hover:shadow-lg shadow-slate-800' onClick={()=>setIsEdit(true)}>Edit</button>
            }
        </div>
      </div>
    </div>
  )
}

export default MyProfile
