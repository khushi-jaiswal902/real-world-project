import React from 'react'
import { Link } from 'react-router-dom'
import p_img17 from '../assets/p_img17.png'
import p_img13 from '../assets/p_img13.png'
import p_img39 from '../assets/p_img39.png'
import p_img3 from '../assets/p_img3.png'

const ShopTheLook = () => {
    const looks = [
        { title: 'Festive Look', image: p_img17, query: 'perfume' },
        { title: 'Funk Look', image: p_img13, query: 'lipstick' },
        { title: 'Glam Look', image: p_img39, query: 'makeup kit' },
        { title: 'No Makeup Look', image: p_img3, query: 'cream' },
    ]

    return (
        <div className='my-16'>
            <div className='mb-8 text-center'>
                <h2 className='text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-4xl'>
                    Shop The Look
                </h2>
                <div className='mx-auto mt-4 h-[2px] w-20 bg-[#f2b6c6]'></div>
            </div>

            <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory'>
                {looks.map((look) => (
                    <Link
                        key={look.title}
                        to={`/collection?look=${encodeURIComponent(look.query)}`}
                        className='group relative block min-w-[280px] snap-start overflow-hidden rounded-[1.25rem] md:min-w-[360px]'
                    >
                        <div className='h-[420px] overflow-hidden bg-[#f4e5e8]'>
                            <img
                                src={look.image}
                                alt={look.title}
                                className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                            />
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent'></div>
                        <div className='absolute bottom-8 left-8 right-8'>
                            <p className='text-2xl font-medium uppercase tracking-wide text-white md:text-3xl'>
                                {look.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ShopTheLook
