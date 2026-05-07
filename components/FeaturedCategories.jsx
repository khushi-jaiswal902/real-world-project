import React, { useContext } from 'react'
import Title from './Title'
import p_img44_2 from '../assets/shampoo/p_img44_2.png.jpg'
import p_img50 from '../assets/p_img50.png.jpg'
import p_img48 from '../assets/soap/p_img48.png.jpg'
import p_img24 from '../assets/face wash/p_img24_2.png'
import p_img17 from '../assets/p_img17.png'
import p_img3 from '../assets/p_img3.png'
import p_img52_2 from '../assets/p_img52_2.png.jpg'
import p_img12 from '../assets/p_img12.png'
import p_img32 from '../assets/p_img32.png'
import p_img45 from '../assets/p_img45.png'
import p_img52 from '../assets/p_img52.png'
import p_img55_2 from '../assets/Nail paint/p_img55_2.jpg'
import p_img38_3 from '../assets/p_img38_3.png.jpg'
import p_img40_2 from '../assets/p_img40_2.png'
import p_img54_7 from '../assets/lip linear/p_img54_7.jpg'
import p_img78 from '../assets/liquid lipstick/p_img78.jpg'
import { ShopContext } from '../context/ShopContext'

const FeaturedCategories = () => {
    const { setSearch, setShowSearch, navigate } = useContext(ShopContext)
    
    const categories = [
        { name: 'Shampoo', image: p_img44_2, query: 'shampoo' },
        { name: 'Oil', image: p_img50, query: 'oil folder' },
        { name: 'Soap', image: p_img48, query: 'soap' },
        { name: 'Face Wash', image: p_img24, query: 'face wash folder' },
        { name: 'Perfume', image: p_img17, query: 'perfume' },
        { name: 'Skincare', image: p_img3, query: 'skin care' },
        { name: 'Room Spray', image: p_img52_2, query: 'room spray folder' },
        { name: 'Lips', image: p_img12, query: 'lipstick' },
        { name: 'Liquid Lipstick', image: p_img78, query: 'liquid lipstick folder' },
        { name: 'Nail', image: p_img55_2, query: 'nail' },
        { name: 'Lip Linear', image: p_img54_7, query: 'lip linear' },
        { name: 'Face Powder', image: p_img32, query: 'face powder' },
        { name: 'Eye', image: p_img45, query: 'eye' },
        { name: 'Brushes & tools', image: p_img52, query: 'brushes tools folder' },
        { name: 'Lip care & Lip Balm', image:p_img38_3, query: 'lip balm' },
        { name: 'MakeUp Kit', image:p_img40_2, query: 'makeup kit' }
    ]

    const handleCategoryClick = (query) => {
        setSearch(query)
        setShowSearch(true)
        navigate('/collection')
    }

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-xl sm:text-2xl font-semibold tracking-widest'>
                <h2 className='text-gray-800' style={{fontFamily: "sans-serif"}}>FEATURED CATEGORIES</h2>
            </div>

            <div className='flex gap-6 sm:gap-12 justify-start overflow-x-auto pb-6 scrollbar-hide px-6 sm:px-0 w-full'>
                {categories.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleCategoryClick(item.query)}
                        className='flex flex-col items-center gap-4 cursor-pointer flex-shrink-0 group'
                    >
                        <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#f1f1f1] shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)] bg-white'>
                            <img src={item.image} alt={item.name} className='w-[85%] h-[85%] object-contain mix-blend-multiply drop-shadow-xl' />
                        </div>
                        <p className='text-base sm:text-xl font-medium text-slate-900 font-serif'>{item.name}</p>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-6 sm:mt-12'>
                <button 
                    onClick={() => {
                        setSearch('')
                        setShowSearch(false)
                        navigate('/collection')
                    }}
                    className='px-8 py-2.5 sm:px-10 sm:py-3 border border-[#5b8c8a] text-[#2d6667] text-sm sm:text-base font-medium rounded shadow-[0_8px_22px_rgba(91,140,138,0.15)] flex justify-center items-center gap-3 hover:bg-[#2d6667] hover:text-white transition-all duration-300'
                >
                    View All Categories <span className='text-lg'>&rarr;</span>
                </button>
            </div>
        </div>
    )
}

export default FeaturedCategories
