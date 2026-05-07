import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cosmetic_serum from '../assets/cosmetic_serum.png'
import cosmetic_lipstick from '../assets/cosmetic_lipstick.png'
import cosmetic_cream from '../assets/cosmetic_cream.png'

const Hero = () => {

    const navigate = useNavigate()

    const carouselData = [
        {
            images: [cosmetic_serum, cosmetic_cream],
            title: "SKINCARE",
            subtitle: "COLLECTIONS",
            tagline: "Nourish Your Glow. Your Perfect Routine Awaits."
        },
        {
            images: [cosmetic_lipstick, cosmetic_serum],
            title: "BEAUTY",
            subtitle: "ESSENTIALS",
            tagline: "Unleash Your Confidence. Premium Colors Await."
        },
        {
            images: [cosmetic_cream, cosmetic_lipstick],
            title: "LUXURY",
            subtitle: "COSMETICS",
            tagline: "Elevate Your Look. The Finest Ingredients."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll functionality
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [carouselData.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const currentSlide = carouselData[currentIndex];

    // SVG Lotus Icon
    const LotusIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 opacity-80 stroke-white">
            <path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 21.5C12 21.5 12 11 12 8C12 8 8.5 10 5.5 14C5.5 14 6 18 12 21.5Z" fill="rgba(255,255,255,0.1)"/>
            <path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 21.5C12 21.5 12 11 12 8C12 8 15.5 10 18.5 14C18.5 14 18 18 12 21.5Z" fill="rgba(255,255,255,0.1)"/>
            <path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 21.5C12 21.5 8 17 4 15.5C4 15.5 3.5 10 8 9L12 21.5Z" fill="none"/>
            <path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 21.5C12 21.5 16 17 20 15.5C20 15.5 20.5 10 16 9L12 21.5Z" fill="none"/>
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 16V9" />
            <path strokeWidth="1" d="M10 16H14" />
        </svg>
    );

    return (
        <div className='relative z-0 flex flex-col sm:flex-row mb-10 overflow-hidden bg-[#f4f1ee] min-h-[400px] md:min-h-[500px] w-full'>
            
            {/* Left Side - Static Banner Area */}
            <div className='w-full sm:w-[45%] flex items-center justify-center relative bg-[#a89c92] transition-colors duration-1000'>
                <div className='relative z-10 text-center px-6 py-16 w-full h-full flex flex-col justify-center'>
                    <LotusIcon />
                    <div className='transition-opacity duration-1000' key={currentSlide.title}>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-2 tracking-widest drop-shadow-sm uppercase'>{currentSlide.title}</h1>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 tracking-[0.2em] drop-shadow-sm uppercase'>{currentSlide.subtitle}</h1>
                        <p className='text-sm sm:text-base text-white/90 font-light tracking-wide'>{currentSlide.tagline}</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Carousel with Pills */}
            <div className='w-full sm:w-[55%] relative bg-[#bc9a8d] flex items-center justify-center p-8'>
                
                <div className='w-full max-w-2xl relative flex items-center justify-center gap-6 md:gap-10 h-[350px] md:h-[400px]'>
                    
                    {/* Floating Title */}
                    <div className='absolute -top-4 right-4 text-white font-serif text-2xl md:text-3xl tracking-[0.2em] opacity-90 z-20'>
                        SHRI SAI COSMETIC
                    </div>

                    {/* Pill Container 1 */}
                    <div className='w-[180px] md:w-[220px] h-[280px] md:h-[340px] rounded-full border border-white/50 relative overflow-hidden flex items-center justify-center group'>
                        {/* Image Transition Wrapper */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}>
                            <img 
                                src={currentSlide.images[0]} 
                                alt="Cosmetic Product" 
                                className='w-full h-full object-cover mix-blend-multiply opacity-90 scale-105 group-hover:scale-110 transition-transform duration-700'
                            />
                        </div>
                    </div>

                    {/* Pill Container 2 */}
                    <div className='w-[180px] md:w-[220px] h-[280px] md:h-[340px] rounded-full border border-white/50 relative overflow-hidden flex flex-col items-center justify-center group'>
                        
                        {/* Image Transition Wrapper */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}>
                            <img 
                                src={currentSlide.images[1]} 
                                alt="Cosmetic Product" 
                                className='w-full h-full object-cover mix-blend-multiply opacity-90 scale-105 group-hover:scale-110 transition-transform duration-700'
                            />
                        </div>

                        {/* Shop Now Button */}
                        <div className='relative z-20 mt-auto mb-8'>
                            <button
                                onClick={() => navigate('/collection')}
                                className='bg-white/95 text-[#bc9a8d] px-8 py-3 rounded-full font-serif font-bold text-sm tracking-widest shadow-md hover:bg-white hover:shadow-lg transition-all hover:scale-105 uppercase'
                            >
                                Shop Now
                            </button>
                        </div>
                        
                        {/* Diamond Decoration */}
                        <div className='absolute right-[-20px] top-1/2 w-4 h-4 bg-white/60 transform rotate-45 hidden md:block'></div>
                    </div>
                    
                    <div className='absolute right-8 top-1/2 text-white/80 hidden md:block'>
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
                    </div>

                </div>

                {/* Slide Counter Indicator */}
                <div className='absolute bottom-6 right-8 bg-black/20 text-white font-serif text-sm px-4 py-2 rounded-full z-20 tracking-wider'>
                    {currentIndex + 1} / {carouselData.length}
                </div>

                {/* Pagination Dots (Diamonds) */}
                <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-30'>
                    {carouselData.map((_, index) => (
                        <div 
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 cursor-pointer transition-colors duration-500 transform rotate-45 ${
                                index === currentIndex ? 'bg-[#7c1c1c] scale-110' : 'bg-[#e2cac1] hover:bg-white'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Hero
