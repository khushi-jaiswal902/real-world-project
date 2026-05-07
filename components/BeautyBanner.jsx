import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import p_img13 from '../assets/p_img13.png'
import p_img39 from '../assets/p_img39.png'
import p_img17 from '../assets/p_img17.png'
import p_img45 from '../assets/p_img45.png'

const BeautyBanner = () => {
    const { setSearch, setShowSearch } = useContext(ShopContext)

    const handleOpenCollection = () => {
        setSearch('')
        setShowSearch(false)
    }

    return (
        <div className='my-16 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#fff1f6_0%,#ffe2eb_35%,#f8d7e5_100%)] shadow-[0_20px_50px_rgba(244,114,182,0.18)]'>
            <div className='grid items-center gap-8 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 lg:px-14 lg:py-14'>
                <div className='relative'>
                    <div className='absolute -left-10 top-6 h-28 w-28 rounded-full bg-white/35 blur-2xl'></div>
                    <div className='absolute left-28 top-28 h-20 w-20 rounded-full bg-[#ff9fbe]/35 blur-xl'></div>
                    <p className='relative mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#d63384]'>
                        Beauty Edit
                    </p>
                    <h2 className='relative max-w-xl text-4xl font-semibold uppercase leading-tight text-[#3a1531] sm:text-5xl'>
                        Glow More. Blend Better. Own Every Look.
                    </h2>
                    <p className='relative mt-5 max-w-xl text-sm leading-7 text-[#6f415d] sm:text-base'>
                        Discover a polished beauty banner feel with curated lip, eye, skin and fragrance picks made to turn everyday styling into a full glam moment.
                    </p>

                    <div className='relative mt-8 flex flex-wrap gap-3'>
                        {['Lip Color', 'Skin Glow', 'Eye Definition', 'Soft Fragrance'].map((item) => (
                            <span
                                key={item}
                                className='rounded-full border border-white/70 bg-white/65 px-4 py-2 text-sm font-medium text-[#5c2a49] backdrop-blur'
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className='relative mt-8 flex flex-wrap gap-4'>
                        <Link
                            to='/collection'
                            onClick={handleOpenCollection}
                            className='rounded-full bg-[#ff2f7d] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#eb1f6b]'
                        >
                            Shop Now
                        </Link>
                        <Link
                            to='/collection'
                            onClick={handleOpenCollection}
                            className='rounded-full border border-[#d88aac] bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#7a3056] transition hover:bg-[#fff7fa]'
                        >
                            Explore Looks
                        </Link>
                    </div>
                </div>

                <div className='relative flex min-h-[360px] items-center justify-center'>
                    <div className='absolute left-8 top-4 h-52 w-52 rounded-full bg-white/45 blur-3xl'></div>
                    <div className='absolute bottom-4 right-6 h-48 w-48 rounded-full bg-[#ff8db3]/30 blur-3xl'></div>

                    <div className='relative h-[380px] w-full max-w-[520px]'>
                        <div className='absolute left-0 top-12 flex h-52 w-40 items-center justify-center rounded-[2rem] bg-white/90 p-5 shadow-[0_18px_40px_rgba(156,28,79,0.12)]'>
                            <img src={p_img39} alt='Beauty product' className='h-full w-full object-contain' />
                        </div>
                        <div className='absolute left-[28%] top-0 flex h-72 w-52 items-center justify-center rounded-[2.3rem] bg-white p-6 shadow-[0_22px_50px_rgba(156,28,79,0.15)]'>
                            <img src={p_img13} alt='Lip product' className='h-full w-full object-contain' />
                        </div>
                        <div className='absolute right-0 top-16 flex h-56 w-40 items-center justify-center rounded-[2rem] bg-white/92 p-5 shadow-[0_18px_40px_rgba(156,28,79,0.12)]'>
                            <img src={p_img17} alt='Perfume product' className='h-full w-full object-contain' />
                        </div>
                        <div className='absolute bottom-0 left-[22%] flex h-44 w-44 items-center justify-center rounded-[2rem] bg-[#3d1531] p-5 shadow-[0_18px_40px_rgba(61,21,49,0.22)]'>
                            <img src={p_img45} alt='Eye product' className='h-full w-full object-contain' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeautyBanner
