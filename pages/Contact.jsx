import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washingtone, USA</p>
          <b className='text-gray-800'>Our Mission</b>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: [EMAIL_ADDRESS]</p>
          <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our company and opportunities to join our team.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
