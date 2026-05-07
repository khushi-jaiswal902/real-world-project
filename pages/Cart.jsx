import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets, newArrivalsList, mustTryList, lipstickList, liquidLipstickList, nailPaintList, lipLinearList, shampooList, soapList, brushToolsList, oilList, faceWashList, roomSprayList, necklaceList, accessoriesList, hairLookList } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const normalizeText = (value = '') =>
    value
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  const allProducts = [
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

  useEffect(()=>{
    if(products.length > 0) {
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]) {
         if(cartItems[items][item] > 0) {
            tempData.push({
                id: items,
                size: item,
                quantity: cartItems[items][item]
            })
         }
      }
    }
    setCartData(tempData);
  }
  },[cartItems,products])

  const getRelatedImages = (product) => {
    if (!product?.name) return [];
    const tokens = normalizeText(product.name).split(' ').filter(Boolean);
    const matchTokens = tokens.length >= 2 ? tokens.slice(0, 2) : tokens;
    if (matchTokens.length === 0) return [];

    const relatedItems = allProducts.filter((item) => {
      const nameText = normalizeText(item?.name || '');
      return matchTokens.every((token) => nameText.includes(token));
    });

    const seen = new Set();
    const images = [];
    relatedItems.forEach((item) => {
      const imgList = Array.isArray(item.image) ? item.image : [item.image];
      imgList.forEach((img) => {
        if (img && !seen.has(img)) {
          seen.add(img);
          images.push(img);
        }
      });
    });

    return images.slice(0, 8);
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item)=>{
            const product = allProducts.find((product)=>product._id === item.id);
            if (!product) return null;
            const relatedImages = getRelatedImages(product);

            return (
              <React.Fragment key={item.id}>
                <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img src={product.image?.[0]} alt="" className="w-16 sm:w-20" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{product.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{product.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null :updateQuantity(item.id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item.id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                </div>

                {relatedImages.length > 1 && (
                  <div className='mb-6 mt-3 flex flex-wrap items-center gap-3'>
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Related Images
                    </span>
                    <div className='flex flex-wrap gap-3'>
                      {relatedImages.map((img, idx) => (
                        <div key={`${img}-${idx}`} className='h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white'>
                          <img src={img} alt="" className='h-full w-full object-contain' />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <div className='flex flex-col items-end gap-3 sm:flex-row sm:justify-end'>
              <button
                onClick={()=>navigate('/place-order')}
                className='bg-black text-white text-sm px-8 py-3'
              >
                PROCEED TO CHECKOUT
              </button>
              <button
                onClick={()=>navigate('/place-order')}
                className='border border-[#e2b84c] bg-[#f7d46a] text-sm font-semibold text-slate-900 px-8 py-3 transition hover:bg-[#f1c851]'
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
