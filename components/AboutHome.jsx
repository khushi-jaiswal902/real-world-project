import React from 'react'
import about_img from '../assets/about_img.png' // Make sure you have this image or replace with your own

const AboutHome = () => {
  return (
    <div className='my-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#f8f7f5] py-16'>
      <div className='flex flex-col md:flex-row items-stretch gap-10 md:gap-16'>
        
        {/* Left Side - Text Content */}
        <div className='w-full md:w-1/2 flex flex-col justify-center'>
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-8 leading-tight tracking-wide'>
              About <span className='text-[#cbb294] font-light'>JAI JEWELLERS</span>
            </h2>
            
            <div className='space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed'>
                <p>
                    At JAI Jewellers, we believe that jewellery is not just an ornament — 
                    it's a reflection of your individuality, emotions, and timeless beauty.
                </p>
                <p>
                    We specialize in curated 92.5 sterling silver jewellery, carefully 
                    sourced from trusted artisans and manufacturers across India.
                </p>
                <p>
                    Our mission is to make authentic, high-quality, and affordable silver 
                    jewellery accessible to everyone who appreciates elegance and 
                    craftsmanship. Every piece in our collection is selected with a keen 
                    eye for design, purity, and detail — ensuring that you receive 
                    jewellery that's as special as the moments you wear it for.
                </p>
                <p>
                    With a focus on trust, transparency, and quality, JAI Jewellers aims 
                    to redefine your jewellery shopping experience — bringing the 
                    sparkle of true silver to every occasion.
                </p>
                <p className='text-[#cbb294] italic font-medium pt-2'>
                    "Pure. Elegant. Timeless. That's what every JAI Jewellers piece stands for."
                </p>
            </div>

            <div className='mt-10 pt-6 border-t border-gray-200'>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-wider mb-1 font-serif'>
                    Jai Jewellers <span className='lowercase font-sans text-lg font-normal'>is just a brand Name, it is owned</span>
                </h3>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-wider font-serif'>
                    <span className='lowercase font-sans text-lg font-normal'>by</span> Icha jeweller
                </h3>
            </div>
        </div>

        {/* Right Side - Image */}
        <div className='w-full md:w-1/2'>
            <div className='h-[500px] sm:h-[600px] w-full rounded-sm overflow-hidden shadow-lg'>
                <img 
                    src={about_img} 
                    alt="Jai Jewellers Model" 
                    className='w-full h-full object-cover object-center object-[80%_20%]'
                />
            </div>
        </div>

      </div>
    </div>
  )
}

export default AboutHome
