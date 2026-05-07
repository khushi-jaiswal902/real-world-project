import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets, newArrivalsList, mustTryList, nailPaintList, lipLinearList, lipstickList, liquidLipstickList, shampooList, soapList, brushToolsList, oilList, faceWashList, roomSprayList, necklaceList, accessoriesList, hairLookList } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [openSections, setOpenSections] = useState({
    categories: true,
    types: true,
    price: true
  });
  const normalizeText = (value) =>
    (value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const categoryOptions = useMemo(
    () => [...new Set(products.map((item) => item.category).filter(Boolean))].sort(),
    [products]
  );

  const typeOptions = useMemo(
    () => [...new Set(products.map((item) => item.subCategory).filter(Boolean))].sort(),
    [products]
  );

  const latestCollectionList = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
      .slice(0, 12);
  }, [products]);

  const trendingNowList = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
      .slice(0, 10);
  }, [products]);

  const searchGroups = {
    shampoo: ['shampoo'],
    soap: ['soap'],
    oil: ['oil'],
    'face wash': ['face wash'],
    perfume: ['perfume', 'fragrance'],
    skincare: ['skincare', 'skin care'],
    'room spray': ['room spray', 'home care'],
    lips: ['lip care', 'lip balm', 'lipstick', 'lips'],
    eye: ['eyeliner', 'kajal', 'mascara', 'eye'],
    'face powder': ['face powder', 'compact powder', 'compact face powder'],
    'makeup kit': ['makeup kit'],
    'brushes tools': ['beauty tools', 'brushes tools', 'brushes and tools'],
    'lip care lip balm': ['lip care', 'lip balm']
  };

  const getMatchingGroupTerms = (activeSearch) => {
    const normalizedSearch = normalizeText(activeSearch);

    const matchingEntry = Object.entries(searchGroups).find(([groupKey, terms]) => {
      const normalizedGroupKey = normalizeText(groupKey);

      if (normalizedSearch === normalizedGroupKey || normalizedSearch.includes(normalizedGroupKey)) {
        return true;
      }

      return terms.some((term) => {
        const normalizedTerm = normalizeText(term);
        return (
          normalizedSearch === normalizedTerm ||
          normalizedSearch.includes(normalizedTerm) ||
          normalizedTerm.includes(normalizedSearch)
        );
      });
    });

    return matchingEntry?.[1] || null;
  };

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setPriceRange({ min: '', max: '' });
    setSortType('relevant');
  };

  const removeFilterChip = (type, value) => {
    if (type === 'category') {
      setCategory((prev) => prev.filter((item) => item !== value));
      return;
    }

    if (type === 'subCategory') {
      setSubCategory((prev) => prev.filter((item) => item !== value));
      return;
    }

    if (type === 'minPrice') {
      setPriceRange((prev) => ({ ...prev, min: '' }));
      return;
    }

    if (type === 'maxPrice') {
      setPriceRange((prev) => ({ ...prev, max: '' }));
    }
  };

  const activeFilterChips = [
    ...category.map((item) => ({ type: 'category', label: item, value: item })),
    ...subCategory.map((item) => ({ type: 'subCategory', label: item, value: item })),
    ...(priceRange.min ? [{ type: 'minPrice', label: `Min Rs${priceRange.min}`, value: priceRange.min }] : []),
    ...(priceRange.max ? [{ type: 'maxPrice', label: `Max Rs${priceRange.max}`, value: priceRange.max }] : []),
  ];

  const filteredProducts = useMemo(() => {
    let productsCopy = products.slice();
    const activeSearch = normalizeText(search);
    const isNewArrivalsSearch =
      showSearch &&
      activeSearch &&
      ['new arrivals', 'new arrival', 'new launch', 'new'].includes(activeSearch);
    const isMustTrySearch =
      showSearch &&
      activeSearch &&
      ['must try', 'musttry', 'must-try'].includes(activeSearch);
    const isLatestCollectionSearch =
      showSearch &&
      activeSearch &&
      ['latest collection', 'latest collections', 'latest'].includes(activeSearch);
    const isTrendingSearch =
      showSearch &&
      activeSearch &&
      ['trending now', 'trending'].includes(activeSearch);
    const isSkinCareSearch =
      showSearch &&
      activeSearch &&
      ['skin care', 'skincare', 'skin-care', 'cream', 'moisturizer', 'moisturizing cream'].includes(activeSearch);
    const isNailSearch =
      showSearch &&
      activeSearch &&
      ['nail', 'nail paint', 'nail polish'].includes(activeSearch);
    const isLipLinearSearch =
      showSearch &&
      activeSearch &&
      ['lip linear', 'lip liner', 'lipliner'].includes(activeSearch);
    const isLiquidLipstickSearch =
      showSearch &&
      activeSearch &&
      activeSearch.includes('liquid lipstick');
    const isLipstickSearch =
      showSearch &&
      activeSearch &&
      ['lip', 'lips', 'lipstick'].includes(activeSearch);
    const isShampooSearch =
      showSearch &&
      activeSearch &&
      ['shampoo', 'hair shampoo', 'hair care shampoo'].includes(activeSearch);
    const isSoapSearch =
      showSearch &&
      activeSearch &&
      ['soap', 'body soap', 'bath soap'].includes(activeSearch);
    const isBrushToolsFolderSearch =
      showSearch &&
      activeSearch &&
      ['brushes tools folder', 'brushes tools images', 'brushes & tools folder', 'brushes tools all', 'brushes tools'].includes(activeSearch);
    const isBrushToolsSearch =
      showSearch &&
      activeSearch &&
      ['brushes tools', 'brushes & tools', 'brushes and tools', 'brushes', 'beauty tools'].includes(activeSearch);
    const isOilFolderSearch =
      showSearch &&
      activeSearch &&
      ['oil folder', 'oil images', 'hair oil folder'].includes(activeSearch);
    const isFaceWashFolderSearch =
      showSearch &&
      activeSearch &&
      ['face wash folder', 'facewash folder', 'face wash images'].includes(activeSearch);
    const isRoomSprayFolderSearch =
      showSearch &&
      activeSearch &&
      ['room spray folder', 'room spray images', 'room spray all'].includes(activeSearch);
    const isNecklaceSearch =
      showSearch &&
      activeSearch &&
      ['necklace', 'necklaces', 'jewelry', 'jewellery'].includes(activeSearch);
    const isAccessoriesSearch =
      showSearch &&
      activeSearch &&
      ['accessories', 'accessory'].includes(activeSearch);
    const isHairLookSearch =
      showSearch &&
      activeSearch &&
      ['hair look', 'hairlook', 'hair looks', 'hair style', 'hairstyle'].includes(activeSearch);

    if (isNewArrivalsSearch) {
      productsCopy = newArrivalsList.slice();
    } else if (isMustTrySearch) {
      productsCopy = mustTryList.slice();
    } else if (isLatestCollectionSearch) {
      productsCopy = latestCollectionList.slice();
    } else if (isTrendingSearch) {
      productsCopy = trendingNowList.slice();
    } else if (isBrushToolsFolderSearch) {
      productsCopy = brushToolsList.slice();
    } else if (isOilFolderSearch) {
      productsCopy = oilList.slice();
    } else if (isFaceWashFolderSearch) {
      productsCopy = faceWashList.slice();
    } else if (isRoomSprayFolderSearch) {
      productsCopy = roomSprayList.slice();
    } else if (isNecklaceSearch) {
      productsCopy = necklaceList.slice();
    } else if (isAccessoriesSearch) {
      productsCopy = accessoriesList.slice();
    } else if (isHairLookSearch) {
      productsCopy = hairLookList.slice();
    } else if (isShampooSearch) {
      productsCopy = shampooList.slice();
    } else if (isSoapSearch) {
      productsCopy = soapList.slice();
    } else if (isNailSearch) {
      productsCopy = nailPaintList.slice();
    } else if (isLipLinearSearch) {
      productsCopy = lipLinearList.slice();
    } else if (isLiquidLipstickSearch) {
      productsCopy = liquidLipstickList.slice();
    } else if (isLipstickSearch) {
      productsCopy = lipstickList.slice();
    } else if (isSkinCareSearch) {
      productsCopy = productsCopy.filter((item) => {
        const subCategoryText = normalizeText(item.subCategory);
        const nameText = normalizeText(item.name);
        const isCreamItem =
          nameText.includes('cream') ||
          nameText.includes('moisturizing cream') ||
          nameText.includes('moisturiser');
        const isAllowedSpecific =
          nameText.includes('lakme 9to5 perfect radiance') &&
          !nameText.includes('foundation');

        const isBlockedDailyMoisturizing = nameText.includes('daily moisturizing cream');
        const isBlockedFoundation = nameText.includes('foundation');

        return (isCreamItem || isAllowedSpecific) && !isBlockedDailyMoisturizing && !isBlockedFoundation;
      });

      const seenNames = new Set();
      productsCopy = productsCopy.filter((item) => {
        const key = normalizeText(item.name);
        if (seenNames.has(key)) {
          return false;
        }
        seenNames.add(key);
        return true;
      });
    } else if (isBrushToolsSearch) {
      productsCopy = productsCopy.filter((item) => {
        const nameText = normalizeText(item.name);
        const subCategoryText = normalizeText(item.subCategory);
        const isBrush =
          nameText.includes('brush') ||
          nameText.includes('makeup brush');
        const isBlender =
          nameText.includes('blender') ||
          nameText.includes('beauty blender');
        const isToolsCategory =
          subCategoryText.includes('beauty tools') ||
          subCategoryText.includes('brushes');

        return (isBrush || isBlender) && isToolsCategory;
      });
    } else if(showSearch && activeSearch) {
      const exactNameMatches = productsCopy.filter((item) => {
        const productName = normalizeText(item.name);
        return productName === activeSearch;
      });

      if (exactNameMatches.length > 0) {
        productsCopy = exactNameMatches;
      } else {
        const groupTerms = getMatchingGroupTerms(activeSearch);

        if (groupTerms) {
          productsCopy = productsCopy.filter((item) => {
            const searchableText = `${normalizeText(item.name)} ${normalizeText(item.subCategory)}`;

            return groupTerms.some((term) => searchableText.includes(normalizeText(term)));
          });
        } else {
          const searchWords = activeSearch.split(' ').filter(Boolean);
          productsCopy = productsCopy.filter((item) => {
            const searchableText = `${normalizeText(item.name)} ${normalizeText(item.subCategory)}`;
            return searchWords.every((word) => searchableText.includes(word));
          });
        }
      }
    }

    if(!isNewArrivalsSearch && !isMustTrySearch && !isLatestCollectionSearch && !isTrendingSearch && !isSkinCareSearch && !isBrushToolsSearch && !isNailSearch && !isLipLinearSearch && !isLiquidLipstickSearch && !isLipstickSearch && !isShampooSearch && !isSoapSearch && !isBrushToolsFolderSearch && !isOilFolderSearch && !isFaceWashFolderSearch && !isRoomSprayFolderSearch && !isNecklaceSearch && !isAccessoriesSearch && !isHairLookSearch && category.length > 0) {
      const normalizedCategories = category.map((item) => normalizeText(item));
      productsCopy = productsCopy.filter((item) =>
        normalizedCategories.includes(normalizeText(item.category))
      );
    }

    if(!isNewArrivalsSearch && !isMustTrySearch && !isLatestCollectionSearch && !isTrendingSearch && !isSkinCareSearch && !isBrushToolsSearch && !isNailSearch && !isLipLinearSearch && !isLiquidLipstickSearch && !isLipstickSearch && !isShampooSearch && !isSoapSearch && !isBrushToolsFolderSearch && !isOilFolderSearch && !isFaceWashFolderSearch && !isRoomSprayFolderSearch && !isNecklaceSearch && !isAccessoriesSearch && !isHairLookSearch && subCategory.length > 0) {
      const normalizedTypes = subCategory.map((item) => normalizeText(item));
      productsCopy = productsCopy.filter((item) =>
        normalizedTypes.includes(normalizeText(item.subCategory))
      );
    }

    if (!isNewArrivalsSearch && !isMustTrySearch && !isLatestCollectionSearch && !isTrendingSearch && !isSkinCareSearch && !isBrushToolsSearch && !isNailSearch && !isLipLinearSearch && !isLiquidLipstickSearch && !isLipstickSearch && !isShampooSearch && !isSoapSearch && !isBrushToolsFolderSearch && !isOilFolderSearch && !isFaceWashFolderSearch && !isRoomSprayFolderSearch && !isNecklaceSearch && !isAccessoriesSearch && !isHairLookSearch && priceRange.min !== '') {
      productsCopy = productsCopy.filter((item) => Number(item.price) >= Number(priceRange.min));
    }

    if (!isNewArrivalsSearch && !isMustTrySearch && !isLatestCollectionSearch && !isTrendingSearch && !isSkinCareSearch && !isBrushToolsSearch && !isNailSearch && !isLipLinearSearch && !isLiquidLipstickSearch && !isLipstickSearch && !isShampooSearch && !isSoapSearch && !isBrushToolsFolderSearch && !isOilFolderSearch && !isFaceWashFolderSearch && !isRoomSprayFolderSearch && !isNecklaceSearch && !isAccessoriesSearch && !isHairLookSearch && priceRange.max !== '') {
      productsCopy = productsCopy.filter((item) => Number(item.price) <= Number(priceRange.max));
    }

    switch(sortType) {
      case 'low-high':
        productsCopy.sort((a,b)=>(a.price - b.price));
        break;
      case 'high-low':
        productsCopy.sort((a,b)=>(b.price-a.price));
        break;
      default:
        break;
    }
    return productsCopy;
  }, [products, search, showSearch, category, subCategory, sortType, priceRange]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pt-10 border-t'>

      <div className='w-full sm:w-[290px] sm:flex-shrink-0'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold tracking-wide'>FILTERS</p>
        <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        <div className={`${showFilter ? '' :'hidden'} sm:block`}>
          <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.06)]'>
            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <p className='text-lg font-semibold text-slate-900'>Filters</p>
              <button onClick={clearAllFilters} className='text-sm font-semibold text-[#2563eb] transition hover:text-[#1d4ed8]'>
                CLEAR ALL
              </button>
            </div>

            {activeFilterChips.length > 0 && (
              <div className='flex flex-wrap gap-2 border-b border-slate-200 px-5 py-4'>
                {activeFilterChips.map((chip) => (
                  <button
                    key={`${chip.type}-${chip.value}`}
                    onClick={() => removeFilterChip(chip.type, chip.value)}
                    className='inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200'
                  >
                    <span className='text-base leading-none'>x</span>
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className='border-b border-slate-200 px-5 py-5'>
              <p className='mb-5 text-base font-semibold text-slate-900'>CATEGORIES</p>
              <div className='space-y-4 text-sm text-slate-500'>
                <p className='flex items-center gap-3'>
                  <span className='text-lg leading-none'>&lsaquo;</span>
                  <span>Beauty and Grooming</span>
                </p>
                <p className='flex items-center gap-3'>
                  <span className='text-lg leading-none'>&lsaquo;</span>
                  <span>Fragrances</span>
                </p>
                <p className='flex items-center gap-3'>
                  <span className='text-lg leading-none'>&lsaquo;</span>
                  <span>Perfume</span>
                </p>
                <p className='pl-6 text-base font-semibold text-slate-900'>Eau De Parfum</p>
              </div>
            </div>

            <div className='border-b border-slate-200'>
              <button
                onClick={() => toggleSection('types')}
                className='flex w-full items-center justify-between px-5 py-4 text-left'
              >
                <span className='text-base font-semibold text-slate-900'>TYPE</span>
                <span className={`text-lg text-slate-500 transition ${openSections.types ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {openSections.types && (
                <div className='max-h-72 overflow-y-auto px-5 pb-5'>
                  <div className='flex flex-col gap-3 text-sm text-slate-700'>
                    {typeOptions.map((item) => (
                      <label key={item} className='flex items-center gap-3'>
                        <input
                          className='h-4 w-4 rounded border-slate-300'
                          type='checkbox'
                          value={item}
                          checked={subCategory.includes(item)}
                          onChange={toggleSubCategory}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleSection('price')}
                className='flex w-full items-center justify-between px-5 py-4 text-left'
              >
                <span className='text-base font-semibold text-slate-900'>PRICE</span>
                <span className={`text-lg text-slate-500 transition ${openSections.price ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {openSections.price && (
                <div className='px-5 pb-5'>
                  <div className='mb-4 h-2 rounded-full bg-slate-200'>
                    <div className='h-2 rounded-full bg-[#2563eb]' style={{ width: '68%' }}></div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <input
                      type='number'
                      min='0'
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      placeholder='Min'
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2563eb]'
                    />
                    <span className='text-slate-400'>to</span>
                    <input
                      type='number'
                      min='0'
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      placeholder='Max'
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2563eb]'
                    />
                  </div>
                </div>
              )}
            </div>

            <div className='border-t border-slate-200'>
              <button
                onClick={() => toggleSection('categories')}
                className='flex w-full items-center justify-between px-5 py-4 text-left'
              >
                <span className='text-base font-semibold text-slate-900'>BRAND</span>
                <span className={`text-lg text-slate-500 transition ${openSections.categories ? 'rotate-180' : ''}`}>⌄</span>
              </button>
            </div>

            <div className='border-t border-slate-200'>
              <button
                onClick={() => toggleSection('types')}
                className='flex w-full items-center justify-between px-5 py-4 text-left'
              >
                <span className='text-base font-semibold text-slate-900'>FRAGRANCE FAMILY</span>
                <span className={`text-lg text-slate-500 transition ${openSections.types ? 'rotate-180' : ''}`}>⌄</span>
              </button>
            </div>
          </div>
        </div>
      </div> 
   

    <div className='flex-1'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
        <Title text1={'ALL'} text2={'COLLECTIONS'}/>

        <select onChange={(e)=>setSortType(e.target.value)} value={sortType} className='w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-[#2563eb]'>
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filteredProducts.map((product) => {
            const primaryImage = [...new Set(product.image || [])][0];

            if (!primaryImage) {
              return null;
            }

            return (
              <ProductItem
                key={`${product._id}-${product.name}`}
                name={product.name}
                id={product._id}
                price={product.price}
                description={product.description}
                image={primaryImage}
              />
            );
          })
        }
      </div>
      {filteredProducts.length === 0 && (
        <p className='mt-6 text-sm text-gray-500'>No products found for "{search}".</p>
      )}
    </div>
     </div>
  )
}

export default Collection
