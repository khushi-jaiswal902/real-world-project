import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import JewelryCollection from '../components/JewelryCollection'
import AccessoriesCollection from '../components/AccessoriesCollection'
import HairLookCollection from '../components/HairLookCollection'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import FeaturedCategories from '../components/FeaturedCategories'
import Trending from '../components/Trending'
import NewArrivals from '../components/NewArrivals'
import MustTry from '../components/MustTry'
import ShopTheLook from '../components/ShopTheLook'
import BeautyBanner from '../components/BeautyBanner'
import ShopByRange from '../components/ShopByRange'

const Home = () => {
  return (
    <div>
        <div className='mt-6 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
          <Hero />
        </div>
        <FeaturedCategories />
        <JewelryCollection />
        <AccessoriesCollection />
        <HairLookCollection />
        <LatestCollection/>
        <Trending />
        <NewArrivals />
        <MustTry />
        <BeautyBanner />
        <ShopTheLook />
        <ShopByRange />
        <OurPolicy />
        <NewsletterBox />
    </div>
  )
}

export default Home
