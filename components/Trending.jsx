import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Trending = () => {
    const { products, addToCart, setSearch, setShowSearch, currency, navigate } = useContext(ShopContext)

    const trendingProducts = useMemo(() => {
        return [...products]
            .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
            .slice(0, 10)
    }, [products])

    const handleViewAll = () => {
        setSearch('trending now')
        setShowSearch(true)
    }

    const handleBuyNow = (item) => {
        const size = item.sizes?.[0] || 'one size'
        addToCart(item._id, size)
        navigate('/place-order')
    }

    return (
        <div className='my-14'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'TRENDING'} text2={'NOW'} />
                <p className='m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base'>
                    Explore the products people are checking out the most right now, picked from the latest arrivals in the collection.
                </p>
            </div>

            <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5'>
                {trendingProducts.map((item) => {
                    const defaultSize = item.sizes?.[0] || 'one size'

                    return (
                        <div key={item._id} className='flex h-full flex-col'>
                            <ProductItem
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                image={item.image?.[0]}
                                price={item.price}
                                to='/collection'
                                onClick={handleViewAll}
                                className='flex-1'
                            />
                            <div className='mt-3 flex flex-col gap-3 sm:flex-row'>
                                <button
                                    onClick={() => addToCart(item._id, defaultSize)}
                                    className='w-full rounded-2xl bg-[#ff2f7d] px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#eb1f6b]'
                                >
                                    Add To Cart
                                </button>
                                <button
                                    onClick={() => handleBuyNow(item)}
                                    className='w-full rounded-2xl border border-[#ff2f7d] px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-[#ff2f7d] transition hover:bg-[#fff0f5]'
                                >
                                    Buy at {currency}{item.price}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Trending
