
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-[#FBF5F0] text-[#4E4E4E] pt-20 pb-10 mt-20'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

        {/* --- Left Brand Section --- */}
        <div>
          <h2 className='text-3xl font-serif mb-5 text-black prata-regular'>Shri Sai Beauty Parlour</h2>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
  Creating luxurious cosmetic essentials that elevate everyday beauty. Every product is a blend of sophistication, quality, and timeless charm.
</p>

          <div className='flex gap-4 mt-6'>
            {/* Social Icons - Using simple placeholders or assets if available, here using buttons as seen in design */}
             <div className='w-10 h-10 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition'>
                <i className="fa-brands fa-instagram text-xl"></i> {/* Assuming FontAwesome or similar might be present, else just a box */}
                <img src={assets.instagram_icon} alt="" className='w-4' onError={(e) => e.target.style.display = 'none'} /> 
             </div>
             <div className='w-10 h-10 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition'>
                <img src={assets.facebook_icon} alt="" className='w-4' onError={(e) => e.target.style.display = 'none'} />
             </div>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
            <p className='text-lg font-serif mb-5 text-black prata-regular'>Quick Links</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='cursor-pointer hover:text-black'>Collections</li>
                <li className='cursor-pointer hover:text-black'>Concealer</li>
                <li className='cursor-pointer hover:text-black'>Makeup</li>
                <li className='cursor-pointer hover:text-black'>Perfume</li>
                <li className='cursor-pointer hover:text-black'>Skincare</li>
            </ul>
        </div>

        {/* --- Customer Service --- */}
        <div>
            <p className='text-lg font-serif mb-5 text-black prata-regular'>Customer Service</p>
             <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='cursor-pointer hover:text-black'>Products Guide</li>
                <li className='cursor-pointer hover:text-black'>Care Instructions</li>
                <li className='cursor-pointer hover:text-black'>Shipping & Returns</li>
                <li className='cursor-pointer hover:text-black'>FAQ</li>
            </ul>
        </div>

        {/* --- Get in Touch --- */}
        <div>
            <p className='text-lg font-serif mb-5 text-black prata-regular'>Get in Touch</p>
            <ul className='flex flex-col gap-4 text-gray-600'>
                <li className='flex items-center gap-2'>
                     <span className='material-icons-outlined text-sm'>email</span> shri.sai.beauty.parlour@gmail.com
                </li>
                <li className='flex items-center gap-2'>
                    <span className='material-icons-outlined text-sm'>phone</span> +91 8081734986
                </li>
                <li className='flex items-start gap-2'>
                    <span className='material-icons-outlined text-sm mt-1'>location_on</span> Dinesh Jaiswal Jaunpur 222203
                </li>
            </ul>
        </div>
      </div>

      {/* --- Newsletter Section --- */}
        <div className='w-full text-center my-16 px-4'>
             <h3 className='text-xl font-serif mb-2 text-black prata-regular'>Stay in the Loop</h3>
             <p className='text-gray-600 mb-6'>Subscribe to our newsletter for exclusive offers, new collections, and beauty care tips.</p>
             <div className='flex items-center justify-center gap-2'>
                 <input className='p-3 w-80 bg-white border border-gray-200 outline-none rounded-sm' type="email" placeholder='Enter your email' />
                 <button className='bg-[#C9B08F] text-black px-8 py-3 rounded-sm font-medium hover:bg-[#bba07e] transition'>Subscribe</button>
             </div>
        </div>


      {/* --- Bottom Copyright --- */}
      <div className='border-t border-gray-300 mx-4 sm:mx-[5vw] md:mx-[7vw] lg:mx-[9vw] pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500'>
        <p>Copyright 2025 Jai Jewellers. All Rights Reserved. Designed and Developed by Craftory Studio. Made with ♥ in India</p>
        <div className='flex gap-4 mt-2 sm:mt-0'>
            <p className='cursor-pointer'>Privacy Policy</p>
            <p className='cursor-pointer'>Terms of Service</p>
            <p className='cursor-pointer'>Cookie Policy</p>
        </div>
      </div>

    </div>
  )
}

export default Footer
