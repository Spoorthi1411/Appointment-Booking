import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const AddService = () => {

  const [category, setCategory] = useState('');
  const [service,setService] = useState('');

  const serviceByCategory = {
    Cleaning: ['Bathroom Cleaning','House Cleaning','Laundary'],
    Repair:['Plumber','Carpenter'],
    Painting:['Painting'],
    Shifting:['Shifting'],
    Electricity:['Installation','Wiring'],
  };

  const [profilePic,setPic] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')

  const {backendUrl , aToken } =useContext(AdminContext)

  const onSubmitHandler = async(event)=>{
    event.preventDefault()

    try {
      
      if(!profilePic){
        return toast.error('Image not selected')
      }

      const formData = new FormData()
      formData.append('image',profilePic)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',fees)
      formData.append('description',about)
      formData.append('category',category)
      formData.append('serviceName',service)
      formData.append('available',true)

      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`);
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-service',formData,{headers:{aToken}})

      console.log("API Response:", data);

      if(data.success){
        toast.success(data.message)
        setPic(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAbout('')
        setExperience('1 Year')
        setService('')
        setCategory('')
      }else{
        toast.error(error.message)
        console.log(error)
      }
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      
      <p className='mb-3 text-lg font-medium'>Add Service</p>
      
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        
        <div className='flex items-center text-gray-500 gap-4 mb-8'>
          
          <label htmlFor='service-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={profilePic ? URL.createObjectURL(profilePic) : assets.profile}/>
          </label>
          <input onChange={(e)=>setPic(e.target.files[0])} type='file' id='service-img' hidden/>
          <p>Upload profile <br/> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Employee Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border border-gray-300 rounded px-3 py-2' type='text' placeholder='Name' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-300 rounded px-3 py-2' type='email' placeholder='Email' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-300 rounded px-3 py-2' type='password' placeholder='Password' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded px-3 py-2'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value=">5 Year">greater than 5 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border border-gray-300 rounded px-3 py-2' type='number' placeholder='fees' required/>
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Service Category</p>
              <select className='border border-gray-300 rounded px-3 py-2' value={category} onChange={(e)=>{
                setCategory(e.target.value);
                setService('');
              }}>
                <option value="">Select Category</option>
                {Object.keys(serviceByCategory).map((cat)=>(
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Service Name</p>
              <select className='border border-gray-300 rounded px-3 py-2' value={service} onChange={(e)=>setService(e.target.value)} disabled={!category}
              >
                <option value="">Select Service</option>
                {category && serviceByCategory[category].map((srv)=>(
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About Service</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border border-gray-300 rounded' placeholder='write about the service'/>
        </div>
        <button type='submit' className='bg-[#d86e7c] px-10 py-3 mt-4 text-white rounded-full'>Add Service</button>
      </div>
    </form>
  )
}

export default AddService

