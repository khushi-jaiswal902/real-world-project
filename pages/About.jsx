import React from 'react'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import about_img from '../assets/about_img.png'

// Import images directly for Our Story section
import p_img1 from '../assets/p_img1.png'
import p_img5 from '../assets/p_img5.png'
import p_img6_2 from '../assets/p_img6_2.png'
import p_img6_7 from '../assets/p_img6_7.png'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* New About Section Design */}
      <div className='my-8 sm:my-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#f8f7f5] py-12 sm:py-20 rounded-xl mx-4 sm:mx-0'>
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
              </div>
          </div>

          {/* Right Side - Image */}
          <div className='w-full md:w-1/2'>
              <div className='h-[400px] sm:h-[500px] md:h-[600px] w-full rounded-sm overflow-hidden shadow-lg'>
                  <img 
                      src={about_img} 
                      alt="Cosmetics and Accessories" 
                      className='w-full h-full object-cover object-center'
                  />
              </div>
          </div>

        </div>
      </div>

      {/* Our Story Section */}
      <div className='my-8 sm:my-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12'>
        <div className='flex flex-col md:flex-row items-center gap-10 md:gap-16'>
          
          {/* Left Side - Text Content */}
          <div className='w-full md:w-[55%] flex flex-col justify-center'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-8 font-bold'>
              Our Story
            </h2>
            
            <div className='space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed'>
              <p>
                Every great journey begins with a simple idea — and ours was to make 
                premium silver jewellery accessible to everyone who values elegance and 
                authenticity.
              </p>
              <p>
                At JAI Jewellers, we started with a clear vision: to bring together the beauty 
                of handcrafted designs and the trust of genuine 92.5 sterling silver. We 
                carefully curate our collections from skilled artisans and trusted suppliers 
                across India, ensuring each piece carries a story of art, tradition, and 
                purity.
              </p>
              <p>
                From timeless classics to modern trends, every design we offer reflects our 
                dedication to quality, craftsmanship, and customer satisfaction. We believe 
                jewellery should do more than just look beautiful — it should make you feel 
                confident, connected, and special.
              </p>
              <p>
                Our story is built on trust, shaped by creativity, and inspired by the people 
                who wear our jewellery with pride.
              </p>
            </div>
            
            <div className='mt-8'>
              <button 
                onClick={() => navigate('/collection')}
                className='border border-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer'>
                View Our Legacy Collection
              </button>
            </div>
          </div>

          {/* Right Side - Image Grid */}
          <div className='w-full md:w-[45%] grid grid-cols-2 gap-4 h-full relative'>
            <div className='flex flex-col gap-4 mt-8'>
              <div className='rounded-md overflow-hidden bg-[#c39b89] h-[180px] shadow-sm'>
                <img src={p_img1} alt="Products" className='w-full h-full object-contain mix-blend-multiply' />
              </div>
              <div className='rounded-md overflow-hidden bg-[#cda998] h-[220px] shadow-sm'>
                <img src={p_img5} alt="Products" className='w-full h-full object-contain mix-blend-multiply scale-125' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='rounded-md overflow-hidden bg-[#d8b8a8] h-[220px] shadow-sm'>
                <img src={p_img6_2} alt="Products" className='w-full h-full object-contain mix-blend-multiply scale-110' />
              </div>
              <div className='rounded-md overflow-hidden bg-[#d2afa0] h-[200px] shadow-sm'>
                <img src={p_img6_7} alt="Products" className='w-full h-full object-contain mix-blend-multiply scale-125' />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Kept the original Why Choose Us section for functionality/content */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#f8f7f5] py-16 mt-8'>
          <div className='text-2xl py-4 border-t border-gray-200'>
            <div className='inline-flex gap-2 items-center mb-8'>
              <p className='text-gray-500'>WHY <span className='text-gray-700 font-medium'>CHOOSE US</span></p>
              <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
            </div>
          </div>

          <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white rounded-md shadow-sm mx-2 md:mx-0'>
              <b className='text-lg'>Quality Assurance</b>
              <p className='text-gray-600'>Every piece of jewellery undergoes rigorous quality checks to ensure purity and perfection before it reaches you.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white rounded-md shadow-sm mx-2 md:mx-0 -my-4 md:-my-0 z-10 scale-105'>
              <b className='text-lg'>Authentic Designs</b>
              <p className='text-gray-600'>We bring you exclusive handcrafted designs that merge traditional artistry with contemporary fashion.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white rounded-md shadow-sm mx-2 md:mx-0'>
              <b className='text-lg'>Secure Shopping</b>
              <p className='text-gray-600'>Experience a seamless and safe shopping journey with fast delivery and dedicated customer support.</p>
            </div>
          </div>
      </div>
      
      <NewsletterBox />
    </div>
  )
}

export default About
