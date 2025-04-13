import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='flex items-center flex-col gap-3 justify-center'>
            <p className='font-bold text-[46px] text-center'>
            Book <span className='text-[#d86e7c]'>Home Services </span><br/> in Just one Click! 
            </p>
            <p className='text-xl text-gray-400 font-semibold text-sm'>Home Services Made Simple & Hassle-Free.</p>
            <div className='mt-4 flex'>
                <input placeholder='search' className='rounded-full md:w-[350px] pl-4 p-2 border-solid border-gray-400 border-[2px]'></input>
                <button className='rounded-full size-8 mt-1 ml-2 bg-[#d86e7c]'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-white'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header


