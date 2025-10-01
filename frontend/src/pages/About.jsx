import React from 'react'
import { asserts } from '../assets/asserts'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={asserts.aboutUs}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>At TaskBazaar , we believe every home deserves the best care. Founded with a passion for helping families and homeowners, we provide reliable and professional home services designed to make life easier. Whether it’s fixing a leak, cleaning your space, or handling electrical repairs, our goal is to ensure your home is always safe, comfortable, and well-maintained.</p>
          <p>With years of hands-on experience, our team is made up of skilled technicians and friendly staff who are committed to delivering top-quality service. We take pride in our attention to detail, timely response, and customer-first approach. Licensed and insured, we bring both expertise and trustworthiness to every job, no matter how big or small.</p>
          <p>What sets us apart is our dedication to customer satisfaction. From transparent pricing to guaranteed results, we work hard to give you peace of mind and the confidence that your home is in good hands. At TaskBazaar , we don’t just fix problems—we build long-term relationships with our customers by treating every home like it’s our own.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted service professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Personalized service recommendations and timely reminders to keep your home in perfect shape.</p>
        </div>
      </div>
    </div>
  )
}

export default About
