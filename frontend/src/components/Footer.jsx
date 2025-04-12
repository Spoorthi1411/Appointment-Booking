import React from 'react'
import { asserts } from '../assets/asserts'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/*------left section------ */}
        <div>
            <div className='mb-5 flex items-center'>
                <img src={asserts.logo} alt="" className='w-14 h-10'/>
                <p className='text-[#d86e7c] font-bold text-2xl curso'>Home Service</p>
            </div>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, dolor deleniti! Voluptates, non beatae. Provident neque, quod suscipit dolores sed perspiciatis labore alias quas delectus porro sequi unde illo vel!</p>
        </div>
        {/*------mid section------ */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/*------right section-----*/}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-323-232-1234</li>
                <li>homeserive@gmail.com</li>
            </ul>
        </div>
      </div>
      {/*----Copyright Text-----*/}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ Home Services - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
