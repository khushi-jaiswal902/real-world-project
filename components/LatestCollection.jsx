import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const LatestCollection = () => {
    const { products, currency, setSearch, setShowSearch, navigate, addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext)

    const latestProducts = useMemo(() => {
        return [...products]
            .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
            .slice(0, 12)
    }, [products])

    const handleViewAll = () => {
        setSearch('latest collection')
        setShowSearch(true)
        navigate('/collection')
    }

    const handleBuyNow = (item) => {
        const size = item.sizes?.[0] || 'one size'
        addToCart(item._id, size)
        navigate('/place-order')
    }

    return (
        <div className='my-16'>
            <div className='mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-4xl'>
                    Latest Collections
                </h2>
                <button
                    type='button'
                    onClick={handleViewAll}
                    className='text-sm font-medium text-[#ff4f7d] transition hover:text-[#e83869] sm:text-base'
                >
                    View All &rsaquo;
                </button>
            </div>

            <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory'>
                {latestProducts.map((item, index) => {
                    const image = item.image?.[0]
                    const inWishlist = isInWishlist ? isInWishlist(item._id) : false
                    const normalizedName = (item.name || '').toLowerCase()
                    const namedOverride =
                        normalizedName === 'liquid foundation'
                            ? 'Fair & lovely cream'
                            : normalizedName.includes('hydrating face serum')
                                ? 'Lakme perfect radiance cream'
                                : normalizedName === 'premium matte lipstick'
                                    ? 'Lakme perfect radinace cream'
                                    : normalizedName === 'luxury eau de parfum'
                                        ? 'Ponds bright beauty cream'
                                        : '';

                    const displayName =
                        namedOverride ||
                        (index === 0 ? 'Swiss Beauty Foundation' :
                        index === 1 ? 'Lakme Foundation' :
                        index === 2 ? 'Lakme Face Powder' :
                        normalizedName === 'facewash' ||
                        normalizedName === 'face wash' ||
                        normalizedName.includes('face wash')
                            ? 'Fair Lovely Facewash'
                            : normalizedName === 'shampoo' || normalizedName.startsWith('shampoo')
                                ? 'Tressme Shampoo'
                                : normalizedName === 'soap'
                                    ? 'Dove Soap'
                                    : normalizedName === 'toothpaste'
                                        ? 'Dabur Red Toothpaste'
                                        : item.name)

                    return (
                        <div
                            key={`${item._id}-latest`}
                            className='min-w-[290px] snap-start overflow-hidden rounded-[1.6rem] border border-[#ece7df] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] md:min-w-[340px]'
                        >
                            <div className='flex items-center justify-between bg-gradient-to-r from-[#86c52f] via-[#86c52f] to-[#ffe0e6] px-4 py-2 text-xs font-semibold text-white'>
                                <span className='rounded-full bg-[#74b629] px-6 py-1'>Fresh</span>
                                <span className='text-[#ff2f5d]'>BUY4</span>
                            </div>

                            <button type='button' onClick={handleViewAll} className='block w-full text-left'>
                                <div className='relative flex h-[320px] items-center justify-center bg-white p-6'>
                                    <button
                                        type='button'
                                        onClick={(event) => {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            toggleWishlist?.(item._id)
                                        }}
                                        className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition ${inWishlist ? 'bg-[#e34d4d] text-white' : 'bg-white/95 text-[#e34d4d]'}`}
                                        aria-label='Add to wishlist'
                                    >
                                        <svg className='h-4 w-4' viewBox='0 0 24 24' fill={inWishlist ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.6'>
                                            <path d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' />
                                        </svg>
                                    </button>
                                    <img
                                        src={image}
                                        alt={item.name}
                                        className='h-full w-full object-contain'
                                    />
                                </div>
                            </button>

                            <div className='px-4 pb-4 flex flex-col'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='rounded-full bg-[#ffd54f] px-4 py-1 text-xs font-semibold text-slate-900'>
                                        Latest Pick
                                    </span>
                                    <span className='text-xs font-medium text-[#ff6b8f]'>
                                        1 Shades
                                    </span>
                                </div>

                                <button type='button' onClick={handleViewAll} className='block w-full text-left'>
                                    <h3 className='mb-3 min-h-[56px] text-xl font-semibold leading-7 text-slate-900'>
                                        {displayName}
                                    </h3>
                                </button>
                                <p className='mb-3 text-sm text-slate-500 line-clamp-2 min-h-[40px]'>
                                    {item.description || 'Curated pick from our collection for your everyday routine.'}
                                </p>

                                <div className='mb-2 flex items-center justify-center gap-2 text-sm text-slate-500'>
                                    <span className='text-[#ff7d92]'>★</span>
                                    <span>4.8</span>
                                    <span className='text-[#22a447]'>●</span>
                                    <span>24 Reviews</span>
                                </div>

                                <p className='mb-5 text-center text-3xl font-bold text-slate-900'>
                                    {currency}{item.price}
                                </p>

                                <div className='mt-auto flex flex-col gap-3 sm:flex-row'>
                                    <button
                                        type='button'
                                        onClick={handleViewAll}
                                        className='w-full rounded-2xl bg-[#ff2f7d] px-4 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#eb1f6b]'
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => handleBuyNow(item)}
                                        className='w-full rounded-2xl border border-[#ff2f7d] px-4 py-4 text-center text-sm font-bold uppercase tracking-wide text-[#ff2f7d] transition hover:bg-[#fff0f5]'
                                    >
                                        Buy at {currency}{item.price}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LatestCollection
