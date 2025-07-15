import React,{useState} from 'react'

const Login = () => {

    const [state,setState] = useState('Admin')


  return (
    <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-2 border-gray-200 rounded-xl text-[#5E5E5E] text-sm shadow-xl'>
            <p className='text-2xl font-semibold m-auto'><span className='text-[#d86e7c]'> {state} </span> Login </p>
            <div className='w-full'>
              <p>Email</p>
              <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required/>
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required/>
            </div>
            <button className='bg-[#d86e7c] text-white w-full py-2 rounded-md text-base '>Login</button>
            {
              state === 'Admin'
              ? <p>Service Login ? <span className='text-[#d86e7c] underline cursor-pointer' onClick={()=>setState('Service')}>Click here</span></p>
              : <p>Admin Login ? <span className='text-[#d86e7c] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login