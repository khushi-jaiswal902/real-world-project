import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import {
  newArrivalsList,
  mustTryList,
  lipstickList,
  liquidLipstickList,
  nailPaintList,
  lipLinearList,
  shampooList,
  soapList,
  brushToolsList,
  oilList,
  faceWashList,
  roomSprayList,
  necklaceList,
  accessoriesList,
  hairLookList,
} from '../assets/assets';

const Wishlist = () => {
  const { wishlistItems, products } = useContext(ShopContext);

  const allProducts = useMemo(() => {
    return [
      ...products,
      ...newArrivalsList,
      ...mustTryList,
      ...lipstickList,
      ...liquidLipstickList,
      ...nailPaintList,
      ...lipLinearList,
      ...shampooList,
      ...soapList,
      ...brushToolsList,
      ...oilList,
      ...faceWashList,
      ...roomSprayList,
      ...necklaceList,
      ...accessoriesList,
      ...hairLookList,
    ];
  }, [products]);

  const wishlistProducts = useMemo(() => {
    return wishlistItems
      .map((id) => allProducts.find((item) => item._id === id))
      .filter(Boolean);
  }, [wishlistItems, allProducts]);

  return (
    <div className='my-12'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-4xl'>
          Wishlist
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500'>
          Your wishlist is empty. Tap the heart icon on any product to add it here.
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {wishlistProducts.map((item) => (
            <ProductItem
              key={`wishlist-${item._id}`}
              id={item._id}
              image={item.image?.[0]}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
