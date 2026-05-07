import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price, description, rating = 4.8, reviews = 24, to, onClick, className = ''}) => {
    const {currency, toggleWishlist, isInWishlist} = useContext(ShopContext);
    const destination = to || `/product/${id}`;
    const safeDescription = description || 'Curated pick from our collection for your everyday routine.'
    const normalizedName = (name || '').toLowerCase();
    const inWishlist = isInWishlist ? isInWishlist(id) : false;
    const displayName =
        normalizedName === 'liquid foundation'
            ? 'Fair & lovely cream'
            : normalizedName === 'hydrating face serum'
                ? 'Lakme perfect radiance cream'
                : normalizedName === 'rose jasmine perfume' ||
                  normalizedName === 'rose & jasmine perfume'
                ? 'Swiss Beauty Foundation'
                : normalizedName === 'daily moisturizing cream'
                    ? 'Lakme Foundation'
                    : normalizedName === 'compact face powder'
                        ? 'Lakme Face Powder'
                        : normalizedName === 'premium matte lipstick'
                            ? 'Lakme perfect radinace cream'
                            : normalizedName === 'luxury eau de parfum'
                                ? 'Ponds bright beauty cream'
                            : normalizedName === 'facewash' ||
                              normalizedName === 'face wash' ||
                              normalizedName.includes('face wash')
                                ? 'Fair Lovely Facewash'
                                : normalizedName === 'shampoo' || normalizedName.startsWith('shampoo')
                                    ? 'Tressme Shampoo'
                                    : normalizedName === 'soap'
                                        ? 'Dove Soap'
                                        : normalizedName === 'toothpaste'
                                            ? 'Dabur Red Toothpaste'
                                            : name;

  return (
    <Link className={`group block text-gray-700 cursor-pointer ${className}`} to={destination} onClick={onClick}>
    <div className='relative flex h-64 sm:h-72 items-center justify-center overflow-hidden rounded-2xl bg-[#f8f6f2] p-4 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md'>
        <button
            type='button'
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleWishlist?.(id);
            }}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition ${inWishlist ? 'bg-[#e34d4d] text-white' : 'bg-white/95 text-[#e34d4d]'}`}
            aria-label='Add to wishlist'
        >
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill={inWishlist ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.6'>
                <path d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' />
            </svg>
        </button>
        <img src={image} alt={name} className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105" onError={(e) => {
            console.error("Image failed to load:", image);
            e.target.style.display = 'none';
        }} />
    </div>
    <p className='pt-4 pb-1 text-sm font-medium text-slate-800 min-h-[40px]'>{displayName}</p>
    <p className='mb-2 text-xs text-slate-500 line-clamp-2 min-h-[36px]'>{safeDescription}</p>
    <div className='mb-2 flex items-center gap-2 text-xs text-slate-500'>
        <span className='text-[#ff7d92]'>★</span>
        <span>{rating}</span>
        <span className='text-[#22a447]'>●</span>
        <span>{reviews} Reviews</span>
    </div>
    <p className='text-sm font-semibold text-slate-900'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
