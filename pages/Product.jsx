import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets, newArrivalsList, mustTryList, lipstickList, liquidLipstickList, nailPaintList, lipLinearList, shampooList, soapList, brushToolsList, oilList, faceWashList, roomSprayList, necklaceList, accessoriesList, hairLookList } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const normalizeText = (value = '') =>
    value
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

  const shadeFamilies = [
    { key: 'foundation', matchers: ['foundation'] },
    { key: 'compact', matchers: ['compact powder', 'compact', 'face powder'] },
    { key: 'concealer', matchers: ['concealer'] },
    { key: 'lipstick', matchers: ['lipstick', 'liquid lipstick'] },
    { key: 'blush', matchers: ['blush', 'blusher'] },
  ];

  const {productId} = useParams();
  const {products, currency, addToCart, navigate, toggleWishlist, isInWishlist} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState('')
  const [size, setSize] = useState('')
  const [showShadePanel, setShowShadePanel] = useState(false)

  const fetchProductData = async () => {
      const fromMain = products.find((item) => item._id === productId);
      const fallbackItems = [
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
      const fromFallback = fallbackItems.find((item) => item._id === productId);
      const matched = fromMain || fromFallback;

      if (matched) {
        const normalizedItem = {
          ...matched,
          sizes: matched.sizes && matched.sizes.length ? matched.sizes : ['one size'],
          description: matched.description || 'A curated pick from our collection.',
        };
        setProductData(normalizedItem);
        const uniqueImages = Array.from(new Set(normalizedItem.image || []));
        setImage(uniqueImages[0] || '');
        return;
      }
  }
  useEffect(()=>{
    fetchProductData();
  },[productId, products])

  const shadeFamily = useMemo(() => {
    if (!productData) return '';

    const haystack = normalizeText(
      `${productData.name} ${productData.subCategory || ''} ${productData.description || ''}`
    );

    const matchedFamily = shadeFamilies.find(({ matchers }) =>
      matchers.some((matcher) => haystack.includes(normalizeText(matcher)))
    );

    return matchedFamily?.key || '';
  }, [productData]);

  const shadeOptions = useMemo(() => {
    if (!productData || !shadeFamily) return [];

    const familyConfig = shadeFamilies.find(({ key }) => key === shadeFamily);
    if (!familyConfig) return [];

    return products
      .filter((item) => {
        const haystack = normalizeText(
          `${item.name} ${item.subCategory || ''} ${item.description || ''}`
        );

        return familyConfig.matchers.some((matcher) =>
          haystack.includes(normalizeText(matcher))
        );
      })
      .map((item, index) => ({
        ...item,
        shadeLabel: `Shade ${index + 1}`,
        swatchImage: item.image?.[0] || '',
      }));
  }, [productData, products, shadeFamily]);

  const galleryImages = useMemo(() => {
    if (!productData) return [];
    return Array.from(new Set(productData.image || []));
  }, [productData]);

  const isJewelleryProduct = useMemo(() => {
    if (!productData) return false;
    return necklaceList.some((item) => item._id === productData._id);
  }, [productData]);

  const hasAccessoryKeyword = (value, keywords) => {
    const text = (value || '').toLowerCase();
    return keywords.some((keyword) => text.includes(keyword));
  };

  const pickUniqueItems = (items) => {
    const seen = new Set();
    const unique = items.filter((item) => {
      const img = Array.isArray(item.image) ? item.image[0] : item.image;
      const key = img || item._id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const withImages = unique.filter((item) => {
      const img = Array.isArray(item.image) ? item.image[0] : item.image;
      return Boolean(img);
    });
    if (withImages.length <= 4) return withImages;
    const step = Math.max(1, Math.floor(withImages.length / 4));
    const picks = [];
    for (let i = 0; i < withImages.length && picks.length < 4; i += step) {
      picks.push(withImages[i]);
    }
    for (let i = 0; i < withImages.length && picks.length < 4; i += 1) {
      if (!picks.includes(withImages[i])) picks.push(withImages[i]);
    }
    return picks.slice(0, 4);
  };

  const pickAccessories = (keywords) => {
    const filtered = accessoriesList.filter((item) =>
      hasAccessoryKeyword(item.name, keywords)
    );
    return pickUniqueItems(filtered);
  };

  const matchesKeywords = (item, keywords) => {
    if (!item) return false;
    const text = normalizeText(`${item.name || ''} ${item.subCategory || ''} ${item.description || ''}`);
    return keywords.some((keyword) => text.includes(normalizeText(keyword)));
  };

  const clutcherItems = useMemo(
    () => pickAccessories(['clutcher', 'clutch']),
    [accessoriesList]
  );

  const scrunchyItems = useMemo(
    () => pickAccessories(['scrunchy']),
    [accessoriesList]
  );

  const hairBandItems = useMemo(
    () => pickAccessories(['hair band', 'hairband']),
    [accessoriesList]
  );

  const hairRibbonItems = useMemo(
    () => pickAccessories(['hair ribbon', 'ribbon']),
    [accessoriesList]
  );

  const hairClipItems = useMemo(
    () => pickAccessories(['hair clip', 'clip']),
    [accessoriesList]
  );

  const hairLookItems = useMemo(
    () => pickUniqueItems(hairLookList),
    [hairLookList]
  );

  const newArrivalItems = useMemo(
    () => pickUniqueItems(newArrivalsList),
    [newArrivalsList]
  );

  const mustTryItems = useMemo(
    () => pickUniqueItems(mustTryList),
    [mustTryList]
  );

  const liquidLipstickItems = useMemo(
    () => pickUniqueItems(liquidLipstickList),
    [liquidLipstickList]
  );

  const latestCollectionSource = useMemo(() => {
    return [...products].sort((a, b) => Number(b.date || 0) - Number(a.date || 0)).slice(0, 12);
  }, [products]);

  const latestCollectionItems = useMemo(() => {
    return pickUniqueItems(latestCollectionSource);
  }, [latestCollectionSource]);

  const shampooItems = useMemo(() => pickUniqueItems(shampooList), [shampooList]);
  const oilItems = useMemo(() => pickUniqueItems(oilList), [oilList]);
  const soapItems = useMemo(() => pickUniqueItems(soapList), [soapList]);
  const faceWashItems = useMemo(() => pickUniqueItems(faceWashList), [faceWashList]);
  const roomSprayItems = useMemo(() => pickUniqueItems(roomSprayList), [roomSprayList]);
  const lipsItems = useMemo(() => pickUniqueItems(lipstickList), [lipstickList]);
  const nailItems = useMemo(() => pickUniqueItems(nailPaintList), [nailPaintList]);
  const lipLinearItems = useMemo(() => pickUniqueItems(lipLinearList), [lipLinearList]);
  const brushToolsItems = useMemo(() => pickUniqueItems(brushToolsList), [brushToolsList]);

  const perfumeItems = useMemo(() => {
    const filtered = products.filter((item) =>
      matchesKeywords(item, ['perfume', 'fragrance'])
    );
    return pickUniqueItems(filtered);
  }, [products]);

  const skincareItems = useMemo(() => {
    const filtered = products.filter((item) =>
      matchesKeywords(item, ['skincare', 'skin care', 'cream', 'moisturizer', 'moisturising', 'moisturizing'])
    );
    return pickUniqueItems(filtered);
  }, [products]);

  const facePowderItems = useMemo(() => {
    const filtered = products.filter((item) =>
      matchesKeywords(item, ['face powder', 'compact powder', 'compact'])
    );
    return pickUniqueItems(filtered);
  }, [products]);

  const eyeItems = useMemo(() => {
    const filtered = products.filter((item) =>
      matchesKeywords(item, ['eye', 'eyeliner', 'kajal', 'mascara', 'eyeshadow', 'eye shadow'])
    );
    return pickUniqueItems(filtered);
  }, [products]);

  const isClutcherProduct = useMemo(() => {
    if (!productData) return false;
    return (
      hasAccessoryKeyword(productData.name, ['clutcher', 'clutch']) ||
      clutcherItems.some((item) => item._id === productData._id)
    );
  }, [productData, clutcherItems]);

  const isScrunchyProduct = useMemo(() => {
    if (!productData) return false;
    return (
      hasAccessoryKeyword(productData.name, ['scrunchy']) ||
      scrunchyItems.some((item) => item._id === productData._id)
    );
  }, [productData, scrunchyItems]);

  const isHairBandProduct = useMemo(() => {
    if (!productData) return false;
    return (
      hasAccessoryKeyword(productData.name, ['hair band', 'hairband']) ||
      hairBandItems.some((item) => item._id === productData._id)
    );
  }, [productData, hairBandItems]);

  const isHairRibbonProduct = useMemo(() => {
    if (!productData) return false;
    return (
      hasAccessoryKeyword(productData.name, ['hair ribbon', 'ribbon']) ||
      hairRibbonItems.some((item) => item._id === productData._id)
    );
  }, [productData, hairRibbonItems]);

  const isHairClipProduct = useMemo(() => {
    if (!productData) return false;
    return (
      hasAccessoryKeyword(productData.name, ['hair clip', 'clip']) ||
      hairClipItems.some((item) => item._id === productData._id)
    );
  }, [productData, hairClipItems]);

  const isHairLookProduct = useMemo(() => {
    if (!productData) return false;
    return hairLookItems.some((item) => item._id === productData._id);
  }, [productData, hairLookItems]);

  const isNewArrivalProduct = useMemo(() => {
    if (!productData) return false;
    return newArrivalsList.some((item) => item._id === productData._id);
  }, [productData]);

  const isMustTryProduct = useMemo(() => {
    if (!productData) return false;
    return mustTryList.some((item) => item._id === productData._id);
  }, [productData]);

  const isLatestCollectionProduct = useMemo(() => {
    if (!productData) return false;
    return latestCollectionSource.some((item) => item._id === productData._id);
  }, [productData, latestCollectionSource]);

  const isLiquidLipstickProduct = useMemo(() => {
    if (!productData) return false;
    return liquidLipstickList.some((item) => item._id === productData._id);
  }, [productData]);

  const isShampooProduct = useMemo(() => {
    if (!productData) return false;
    return shampooList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['shampoo']);
  }, [productData, shampooList]);

  const isOilProduct = useMemo(() => {
    if (!productData) return false;
    return oilList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['oil']);
  }, [productData, oilList]);

  const isSoapProduct = useMemo(() => {
    if (!productData) return false;
    return soapList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['soap']);
  }, [productData, soapList]);

  const isFaceWashProduct = useMemo(() => {
    if (!productData) return false;
    return faceWashList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['face wash', 'facewash']);
  }, [productData, faceWashList]);

  const isPerfumeProduct = useMemo(() => {
    if (!productData) return false;
    return matchesKeywords(productData, ['perfume', 'fragrance']);
  }, [productData]);

  const isSkincareProduct = useMemo(() => {
    if (!productData) return false;
    return matchesKeywords(productData, ['skincare', 'skin care', 'cream', 'moisturizer', 'moisturising', 'moisturizing']);
  }, [productData]);

  const isRoomSprayProduct = useMemo(() => {
    if (!productData) return false;
    return roomSprayList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['room spray']);
  }, [productData, roomSprayList]);

  const isLipsProduct = useMemo(() => {
    if (!productData) return false;
    return lipstickList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['lip', 'lipstick', 'lip balm', 'lip care']);
  }, [productData, lipstickList]);

  const isNailProduct = useMemo(() => {
    if (!productData) return false;
    return nailPaintList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['nail', 'nail paint', 'nail polish']);
  }, [productData, nailPaintList]);

  const isLipLinearProduct = useMemo(() => {
    if (!productData) return false;
    return lipLinearList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['lip liner', 'lip linear', 'lipliner']);
  }, [productData, lipLinearList]);

  const isFacePowderProduct = useMemo(() => {
    if (!productData) return false;
    return matchesKeywords(productData, ['face powder', 'compact powder', 'compact']);
  }, [productData]);

  const isEyeProduct = useMemo(() => {
    if (!productData) return false;
    return matchesKeywords(productData, ['eye', 'eyeliner', 'kajal', 'mascara', 'eyeshadow', 'eye shadow']);
  }, [productData]);

  const isBrushToolsProduct = useMemo(() => {
    if (!productData) return false;
    return brushToolsList.some((item) => item._id === productData._id) || matchesKeywords(productData, ['brush', 'brushes', 'tools', 'beauty tools']);
  }, [productData, brushToolsList]);

  const renderLikeSection = (items, emptyText, keyPrefix) => (
    <div className='mt-16'>
      <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
      <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {items.length ? items.map((item) => {
          const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

          return (
            <button
              type='button'
              key={`${keyPrefix}-${item._id}`}
              onClick={() => navigate(`/product/${item._id}`)}
              className='group text-left'
            >
              <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                <WishlistBadge itemId={item._id} />
                <img
                  src={imageSrc}
                  alt={item.name}
                  className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                />
              </div>
              <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
              <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
            </button>
          );
        }) : (
          <p className='text-sm text-slate-500'>{emptyText}</p>
        )}
      </div>
    </div>
  );

  const effectiveSizes = useMemo(() => {
    if (!productData) return [];
    if (productData.sizes && productData.sizes.length > 0) return productData.sizes;
    return ['one size'];
  }, [productData]);

  useEffect(() => {
    if (productData && effectiveSizes.length === 1 && effectiveSizes[0] === 'one size') {
      setSize('one size');
    }
  }, [productData, effectiveSizes]);

  useEffect(() => {
    if (!productData || shadeFamily !== 'foundation') {
      setShowShadePanel(false);
    }
  }, [productData, shadeFamily]);

  const WishlistBadge = ({ itemId }) => {
    const inWishlist = isInWishlist ? isInWishlist(itemId) : false;

    return (
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleWishlist?.(itemId);
        }}
        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition ${inWishlist ? 'bg-[#e34d4d] text-white' : 'bg-white/95 text-[#e34d4d]'}`}
        aria-label='Add to wishlist'
      >
        <svg className='h-4 w-4' viewBox='0 0 24 24' fill={inWishlist ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.6'>
          <path d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' />
        </svg>
      </button>
    );
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col gap-3'>
          <div className='w-full'>
            <img src={image} alt="" className="w-full h-auto object-contain max-h-[500px]" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          {/* Shades hidden as requested */}
          {effectiveSizes.length > 1 ? (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {effectiveSizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500': ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
          ) : (
            <p className='my-6 text-sm text-gray-600'>Size: one size</p>
          )}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-white'>
                <img src={image} alt={productData.name} className='h-full w-full object-contain' />
              </div>
              <div className='flex flex-wrap items-center gap-3'>
                <button
                  onClick={() => {
                    addToCart(productData._id, size || effectiveSizes[0])
                    if (shadeFamily === 'foundation' && shadeOptions.length > 1) {
                      setShowShadePanel(true)
                    }
                  }}
                  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => {
                    addToCart(productData._id, size || effectiveSizes[0])
                    navigate('/place-order')
                  }}
                  className='border border-[#e2b84c] bg-[#f7d46a] px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#f1c851]'
                >
                  BUY NOW
                </button>
              </div>
            </div>
            {showShadePanel && shadeFamily === 'foundation' && shadeOptions.length > 1 && (
              <div className='w-full rounded-2xl border border-[#f1e4ea] bg-[#fff9fb] p-4 sm:max-w-[320px]'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#c7416d]'>Shades</p>
                <p className='mt-1 text-xs text-slate-600'>Pick your foundation shade</p>
                <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
                  {shadeOptions.map((item, index) => {
                    const isActive = item._id === productData._id;

                    return (
                      <button
                        type='button'
                        key={`${item._id}-shade-panel`}
                        onClick={() => {
                          setImage(item.image?.[0] || '');
                          navigate(`/product/${item._id}`);
                        }}
                        className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border ${isActive ? 'border-[#111827]' : 'border-[#ead9e2]'}`}
                      >
                        <img src={item.image?.[0]} alt={item.name} className='h-full w-full object-contain' />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className='mt-6'>
              <p className='mb-3 text-sm font-semibold text-slate-700'>More Images</p>
              <div className='flex gap-3 overflow-x-auto pb-2'>
                {galleryImages.map((item, index) => (
                  <button
                    type='button'
                    key={`${item}-thumb-${index}`}
                    onClick={() => setImage(item)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border ${item === image ? 'border-black' : 'border-slate-200'}`}
                  >
                    <img src={item} alt="" className='h-full w-full object-contain' />
                  </button>
                ))}
              </div>
            </div>
          )}
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-900'>Customer Service / Benefit</p>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='text-sm text-gray-500'>
          <p>Welcome to Shri Sai Beauty Parlour, your one-stop destination for quality products and a seamless online shopping experience. We bring together a curated collection of trusted brands and carefully selected items, ensuring you find exactly what you need with ease, convenience, and confidence—all from the comfort of your home.</p>
          <p>At Shri Sai Beauty Parlour, customer satisfaction is at the heart of everything we do. From secure payments and fast delivery to reliable customer support, we are committed to making your shopping journey smooth and enjoyable. Whether you’re discovering new trends or restocking everyday essentials, we strive to deliver value, quality, and trust with every order.</p>

        </div>
      </div>
      {isJewelleryProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {necklaceList.slice(0, 4).map((item) => (
              <button
                type='button'
                key={`jewellery-like-${item._id}`}
                onClick={() => navigate(`/product/${item._id}`)}
                className='group text-left'
              >
                <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                  <WishlistBadge itemId={item._id} />
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                  />
                </div>
                <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {isClutcherProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {clutcherItems.length ? clutcherItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
              <button
                type='button'
                key={`clutcher-like-${item._id}`}
                onClick={() => navigate(`/product/${item._id}`)}
                className='group text-left'
              >
                <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                  <WishlistBadge itemId={item._id} />
                  <img
                    src={imageSrc}
                    alt={item.name}
                    className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                  />
                </div>
                <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
              </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Clutcher items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isScrunchyProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {scrunchyItems.length ? scrunchyItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`scrunchy-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Scrunchy items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isHairBandProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {hairBandItems.length ? hairBandItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`hairband-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Hair band items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isHairRibbonProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {hairRibbonItems.length ? hairRibbonItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`hairribbon-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Hair ribbon items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isHairClipProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {hairClipItems.length ? hairClipItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`hairclip-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Hair clip items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isHairLookProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {hairLookItems.length ? hairLookItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`hairlook-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Hair look items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isNewArrivalProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {newArrivalItems.length ? newArrivalItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`newarrival-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>New arrival items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isMustTryProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {mustTryItems.length ? mustTryItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`musttry-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Must try items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isLatestCollectionProduct && (
        <div className='mt-16'>
          <h2 className='text-2xl font-semibold text-slate-900'>You may also like</h2>
          <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {latestCollectionItems.length ? latestCollectionItems.map((item) => {
              const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

              return (
                <button
                  type='button'
                  key={`latest-like-${item._id}`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='group text-left'
                >
                  <div className='relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f2ee] p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md'>
                    <WishlistBadge itemId={item._id} />
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 text-sm font-semibold text-slate-900'>{item.name}</p>
                  <p className='mt-1 text-sm text-slate-700'>{currency} {item.price}</p>
                </button>
              );
            }) : (
              <p className='text-sm text-slate-500'>Latest collection items are not available yet.</p>
            )}
          </div>
        </div>
      )}
      {isLiquidLipstickProduct && (
        renderLikeSection(liquidLipstickItems, 'Liquid lipstick items are not available yet.', 'liquid-lipstick-like')
      )}
      {isShampooProduct && renderLikeSection(shampooItems, 'Shampoo items are not available yet.', 'shampoo-like')}
      {isOilProduct && renderLikeSection(oilItems, 'Oil items are not available yet.', 'oil-like')}
      {isSoapProduct && renderLikeSection(soapItems, 'Soap items are not available yet.', 'soap-like')}
      {isFaceWashProduct && renderLikeSection(faceWashItems, 'Face wash items are not available yet.', 'facewash-like')}
      {isPerfumeProduct && renderLikeSection(perfumeItems, 'Perfume items are not available yet.', 'perfume-like')}
      {isSkincareProduct && renderLikeSection(skincareItems, 'Skincare items are not available yet.', 'skincare-like')}
      {isRoomSprayProduct && renderLikeSection(roomSprayItems, 'Room spray items are not available yet.', 'roomspray-like')}
      {isLipsProduct && renderLikeSection(lipsItems, 'Lip items are not available yet.', 'lips-like')}
      {isNailProduct && renderLikeSection(nailItems, 'Nail items are not available yet.', 'nail-like')}
      {isLipLinearProduct && renderLikeSection(lipLinearItems, 'Lip liner items are not available yet.', 'liplinear-like')}
      {isFacePowderProduct && renderLikeSection(facePowderItems, 'Face powder items are not available yet.', 'facepowder-like')}
      {isEyeProduct && renderLikeSection(eyeItems, 'Eye items are not available yet.', 'eye-like')}
      {isBrushToolsProduct && renderLikeSection(brushToolsItems, 'Brushes & tools items are not available yet.', 'brush-tools-like')}
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
