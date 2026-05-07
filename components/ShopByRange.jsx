import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import p_img45 from '../assets/p_img45.png'
import p_img39 from '../assets/p_img39.png'
import p_img32 from '../assets/p_img32.png'
import p_img45_2 from '../assets/p_img45_2.png'
import p_img13 from '../assets/p_img13.png'
import p_img36 from '../assets/p_img36.png'
import p_img45_3 from '../assets/p_img45_3.png'
import p_img12 from '../assets/p_img12.png'
import p_img6_7 from '../assets/p_img6_7.png'
import p_img38 from '../assets/p_img38.png'

const ShopByRange = () => {
    const { setSearch, setShowSearch, navigate } = useContext(ShopContext)

    const items = [
        { title: 'Eyeliner', image: p_img45, query: 'eyeliner' },
        { title: 'Blusher', image: p_img39, query: 'blusher' },
        { title: 'Makeup Kit', image: p_img32, query: 'makeup kit' },
        { title: 'Kajal', image: p_img45_2, query: 'kajal' },
        { title: 'Liquid Lipstick', image: p_img13, query: 'liquid lipstick' },
        { title: 'Highlighter', image: p_img36, query: 'highlighter' },
        { title: 'Mascara', image: p_img45_3, query: 'mascara' },
        { title: 'Matte Lipstick', image: p_img12, query: 'matte lipstick' },
        { title: 'Foundation', image: p_img6_7, query: 'foundation' },
        { title: 'Lipstick', image: p_img38, query: 'lipstick' },
    ]

    const handleRangeClick = (query) => {
        setSearch(query)
        setShowSearch(true)
        navigate('/collection')
    }

    return (
        <div className='my-16'>
            <div className='mb-10 text-center'>
                <h2 className='text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-4xl'>
                    Shop By Range
                </h2>
                <div className='mx-auto mt-4 h-[2px] w-20 bg-[#f2b6c6]'></div>
            </div>

            <div className='grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 xl:grid-cols-5'>
                {items.map((item) => (
                    <button
                        key={item.title}
                        type='button'
                        onClick={() => handleRangeClick(item.query)}
                        className='group flex flex-col items-center justify-center text-center'
                    >
                        <div className='flex h-32 w-full items-center justify-center rounded-[1.5rem] bg-white p-4 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:h-36'>
                            <img
                                src={item.image}
                                alt={item.title}
                                className='h-full w-full object-contain'
                            />
                        </div>
                        <p className='mt-3 text-xl font-semibold text-slate-900'>{item.title}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ShopByRange
