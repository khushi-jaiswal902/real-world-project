import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch, navigate, products } = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [activeMenu, setActiveMenu] = useState('')
    const [menuPos, setMenuPos] = useState({ left: 0, top: 0, width: 760 })
    const closeTimeoutRef = useRef(null)
    const faceButtonRef = useRef(null)
    const eyeButtonRef = useRef(null)
    const lipsButtonRef = useRef(null)
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isCollectionPage = location.pathname.includes('collection');
    const quickLinks = [
        { label: 'FACE', query: 'face powder' },
        { label: 'EYE', query: 'eye' },
        { label: 'LIPS', query: 'lipstick' },
        { label: 'NAIL', query: 'nail' },
        { label: 'BRUSHES & TOOLS', query: 'brushes tools' },
        { label: 'NEW ARRIVALS', query: 'new launch' },
        { label: 'SKIN CARE', query: 'skin care' },
        { label: 'ACCESSORIES', query: 'accessories' },
        { label: 'HAIR LOOK', query: 'hair look' },
    ];

    const normalizeText = (value) =>
        (value || '')
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();

    const faceMenuOptions = [
        { label: 'Foundation', query: 'foundation' },
        { label: 'BB & CC Cream', query: 'bb cream' },
        { label: 'Primer and Setting Spray', query: 'primer' },
        { label: 'Concealer', query: 'concealer' },
        { label: 'Face Powder', query: 'face powder' },
        { label: 'Highlighters & Contour', query: 'highlighter' },
        { label: 'Blush and Bronzer', query: 'blush' },
        { label: 'Face Palette', query: 'makeup kit' },
        { label: 'Makeup Brushes', query: 'brushes tools' },
        { label: 'Makeup Remover', query: 'makeup remover' },
        { label: 'Sindoor', query: 'sindoor' },
    ];

    const faceMenuCards = useMemo(() => {
        const pickProduct = (keywords) => {
            const normalized = keywords.map(normalizeText);
            return products.find((product) => {
                const haystack = normalizeText(`${product.name} ${product.subCategory || ''}`);
                return normalized.some((word) => haystack.includes(word));
            });
        };

        const candidates = [
            {
                title: 'Foundation Illuminator',
                keywords: ['foundation'],
                fallbackQuery: 'foundation',
            },
            {
                title: 'Blooming Blush',
                keywords: ['blush', 'blusher'],
                fallbackQuery: 'blush',
            },
            {
                title: 'Glow Highlight',
                keywords: ['highlighter', 'highlight', 'contour', 'face powder', 'compact'],
                fallbackQuery: 'highlighter',
            },
        ];

        return candidates
            .map((item) => {
                const product = pickProduct(item.keywords);
                const image = product?.image ? [...new Set(product.image)][0] : '';
                return {
                    title: item.title,
                    image,
                    query: product ? product.name : item.fallbackQuery,
                };
            })
            .filter((item) => item.image);
    }, [products]);

    const eyeMenuOptions = [
        { label: 'Eyeliner', query: 'eyeliner' },
        { label: 'Kajal', query: 'kajal' },
        { label: 'Eye Shadow', query: 'eyeshadow' },
        { label: 'Mascara', query: 'mascara' },
        { label: 'Eyebrows', query: 'eyebrow' },
        { label: 'Eyeshadow Palettes', query: 'makeup kit' },
    ];

    const eyeMenuCards = useMemo(() => {
        const pickProduct = (keywords) => {
            const normalized = keywords.map(normalizeText);
            return products.find((product) => {
                const haystack = normalizeText(`${product.name} ${product.subCategory || ''}`);
                return normalized.some((word) => haystack.includes(word));
            });
        };

        const candidates = [
            {
                title: 'Romantique Mascaras',
                keywords: ['mascara'],
                fallbackQuery: 'mascara',
            },
            {
                title: 'Smudge Proof',
                keywords: ['kajal', 'eyeliner'],
                fallbackQuery: 'eyeliner',
            },
            {
                title: 'Artistry Palettes',
                keywords: ['palette', 'makeup kit', 'eye shadow'],
                fallbackQuery: 'eyeshadow',
            },
        ];

        return candidates
            .map((item) => {
                const product = pickProduct(item.keywords);
                const image = product?.image ? [...new Set(product.image)][0] : '';
                return {
                    title: item.title,
                    image,
                    query: product ? product.name : item.fallbackQuery,
                };
            })
            .filter((item) => item.image);
    }, [products]);

    const lipsMenuOptions = [
        { label: 'Bullet Lipstick', query: 'lipstick' },
        { label: 'Lip Crayon', query: 'lip crayon' },
        { label: 'Liquid Lipstick', query: 'liquid lipstick' },
        { label: 'Lip Liner', query: 'lip linear' },
        { label: 'Lip Balm', query: 'lip balm' },
        { label: 'Lip Gloss', query: 'lip gloss' },
    ];

    const lipsMenuCards = useMemo(() => {
        const pickProduct = (keywords) => {
            const normalized = keywords.map(normalizeText);
            return products.find((product) => {
                const haystack = normalizeText(`${product.name} ${product.subCategory || ''}`);
                return normalized.some((word) => haystack.includes(word));
            });
        };

        const candidates = [
            {
                title: 'Liquid Lipsticks Wardrobes',
                keywords: ['liquid lipstick'],
                fallbackQuery: 'liquid lipstick',
            },
            {
                title: 'Treat for your Pout',
                keywords: ['lip balm', 'lip care'],
                fallbackQuery: 'lip balm',
            },
            {
                title: 'Unbeatable Mattes',
                keywords: ['lipstick', 'matte'],
                fallbackQuery: 'lipstick',
            },
        ];

        return candidates
            .map((item) => {
                const product = pickProduct(item.keywords);
                const image = product?.image ? [...new Set(product.image)][0] : '';
                return {
                    title: item.title,
                    image,
                    query: product ? product.name : item.fallbackQuery,
                };
            })
            .filter((item) => item.image);
    }, [products]);

    const normalizedSearch = search.trim().toLowerCase();

    const suggestions = useMemo(() => {
        if (!normalizedSearch) {
            return [];
        }

        const matches = [];
        const seen = new Set();

        products.forEach((product) => {
            const productName = (product.name || '').toLowerCase();
            const productSubCategory = (product.subCategory || '').toLowerCase();

            if (
                productName.includes(normalizedSearch) ||
                productSubCategory.includes(normalizedSearch)
            ) {
                const key = `${product.name}-${product.subCategory}`;

                if (!seen.has(key)) {
                    seen.add(key);
                    matches.push({
                        label: product.name,
                        subLabel: product.subCategory || 'Product',
                        image: [...new Set(product.image || [])][0],
                    });
                }
            }
        });

        return matches.slice(0, 8);
    }, [normalizedSearch, products]);

    useEffect(()=>{
        if(isHomePage || isCollectionPage) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    },[isCollectionPage, isHomePage])

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSearch(true);
        setIsFocused(false);
        if (!isCollectionPage) {
            navigate('/collection');
        }
    };

    const handleSuggestionClick = (label) => {
        setSearch(label);
        setShowSearch(true);
        setIsFocused(false);
        if (!isCollectionPage) {
            navigate('/collection');
        }
    };

    const handleQuickLinkClick = (query) => {
        setSearch(query);
        setShowSearch(true);
        setIsFocused(false);
        navigate('/collection');
    };

    const openMenu = (menuKey) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
        }
        const targetRef =
            menuKey === 'EYE'
                ? eyeButtonRef
                : menuKey === 'LIPS'
                    ? lipsButtonRef
                    : faceButtonRef
        const rect = targetRef.current?.getBoundingClientRect?.()
        const desiredWidth = Math.min(1200, window.innerWidth - 32)
        const left = rect ? Math.min(Math.max(16, rect.left), window.innerWidth - desiredWidth - 16) : 16
        const top = rect ? rect.bottom + 12 : 120
        setMenuPos({ left, top, width: desiredWidth })
        setActiveMenu(menuKey)
    }

    const scheduleCloseMenu = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
        }
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu('')
        }, 150)
    }

    const activeMenuConfig = activeMenu === 'EYE'
        ? { options: eyeMenuOptions, cards: eyeMenuCards }
        : activeMenu === 'LIPS'
            ? { options: lipsMenuOptions, cards: lipsMenuCards }
            : activeMenu === 'FACE'
                ? { options: faceMenuOptions, cards: faceMenuCards }
                : null

    return visible && (isHomePage || showSearch) ? (
    <div className={`${isHomePage ? 'bg-white pt-2 pb-5' : 'border-t border-b bg-gray-50 py-5'} text-center relative z-[999] isolate`}>
        <div className='flex w-full items-center gap-8 overflow-visible'>
        {isHomePage && (
            <div className='hidden flex-shrink-0 items-center gap-3 md:flex'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full border border-[#ff6b8f]/40 bg-[#ffe8f0] text-[#ff4f7d]'>
                    <span className='text-lg font-semibold italic'>S</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-semibold italic text-slate-800' style={{ fontFamily: 'cursive' }}>
                        Shri Sai
                    </span>
                    <span className='-mt-1 text-sm font-medium uppercase tracking-[0.25em] text-slate-600'>
                        Cosmetic
                    </span>
                </div>
            </div>
        )}
        {isHomePage && (
            <div className='relative hidden min-w-0 flex-[1.6] items-center gap-4 overflow-x-auto overflow-y-visible rounded-[1.75rem] bg-[#3b3b3b] px-5 py-4 lg:flex scrollbar-hide'>
                {quickLinks.map((item) =>
                    item.label === 'FACE' || item.label === 'EYE' || item.label === 'LIPS' ? (
                        <div key={item.label} className='relative'>
                            <button
                                ref={
                                    item.label === 'FACE'
                                        ? faceButtonRef
                                        : item.label === 'EYE'
                                            ? eyeButtonRef
                                            : lipsButtonRef
                                }
                                type='button'
                                onMouseEnter={() => openMenu(item.label)}
                                onMouseLeave={scheduleCloseMenu}
                                onClick={() => handleQuickLinkClick(item.query)}
                                className='whitespace-nowrap rounded-full border border-[#ff3b4e] bg-black px-4 py-2 text-[13px] font-semibold tracking-wide text-white transition duration-200 hover:scale-105 hover:border-[#ff6b7a] hover:bg-[#111111] hover:text-white'
                            >
                                {item.label}
                            </button>
                        </div>
                    ) : (
                        <button
                            key={item.label}
                            type='button'
                            onClick={() => handleQuickLinkClick(item.query)}
                            className='whitespace-nowrap rounded-full border border-[#ff3b4e] bg-black px-4 py-2 text-[13px] font-semibold tracking-wide text-white transition duration-200 hover:scale-105 hover:border-[#ff6b7a] hover:bg-[#111111] hover:text-white'
                        >
                            {item.label}
                        </button>
                    )
                )}
            </div>
        )}
        {isHomePage && activeMenuConfig && (
            <div
                className='fixed z-[1000] rounded-3xl border border-slate-200 bg-white p-14 shadow-[0_30px_70px_rgba(15,23,42,0.18)]'
                style={{ left: menuPos.left, top: menuPos.top, width: menuPos.width }}
                onMouseEnter={() => openMenu(activeMenu)}
                onMouseLeave={scheduleCloseMenu}
            >
                <div className='flex gap-10'>
                    <div className='grid flex-1 grid-cols-2 gap-4 text-base text-slate-700'>
                        {activeMenuConfig.options.map((option) => (
                            <button
                                key={option.label}
                                type='button'
                                onClick={() => handleQuickLinkClick(option.query)}
                                className='text-left transition hover:text-[#ff4f9d]'
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    {activeMenuConfig.cards.length > 0 && (
                        <div className='flex flex-[1.1] gap-4'>
                            {activeMenuConfig.cards.map((card) => (
                                <button
                                    key={card.title}
                                    type='button'
                                    onClick={() => handleQuickLinkClick(card.query)}
                                    className='flex-1 text-left'
                                >
                                    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.08)]'>
                                        <div className='flex h-72 items-center justify-center bg-[#f6f0f4] p-4'>
                                            <img src={card.image} alt={card.title} className='h-full w-full object-contain' />
                                        </div>
                                        <p className='px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-700'>
                                            {card.title}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}
        <div className='flex w-full max-w-5xl flex-1 items-center gap-3'>
        <form onSubmit={handleSubmit} className='flex flex-1 items-start gap-3'>
            <div className='relative flex-1'>
            <div className='flex items-center rounded-2xl border border-[#cfd8ea] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(37,99,235,0.08)]'>
                <img src={assets.search_icon} alt="" className="mr-3 w-5 opacity-70" />
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                    className='flex-1 outline-none bg-transparent text-sm sm:text-base text-slate-700'
                    type="text"
                    placeholder='Search for Products, Brands and More'
                />
            </div>
            {isFocused && suggestions.length > 0 && (
                <div className='absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_18px_50px_rgba(15,23,42,0.12)]'>
                    {suggestions.map((item, index) => (
                        <button
                            key={`${item.label}-${index}`}
                            type='button'
                            onMouseDown={() => handleSuggestionClick(item.label)}
                            className='flex w-full items-center gap-3 px-4 py-3 transition hover:bg-slate-50'
                        >
                            <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-50'>
                                {item.image ? (
                                    <img src={item.image} alt={item.label} className='h-full w-full object-contain' />
                                ) : (
                                    <img src={assets.search_icon} alt="" className='w-4 opacity-60' />
                                )}
                            </div>
                            <div className='min-w-0'>
                                <p className='truncate text-sm font-medium text-slate-800'>{item.label}</p>
                                <p className='truncate text-xs text-slate-500'>in {item.subLabel}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
            </div>
            {!isHomePage && (
                <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" className="w-4 cursor-pointer opacity-70" />
            )}
        </form>
        </div>
        </div>
    </div>
  ) : null
}

export default SearchBar
