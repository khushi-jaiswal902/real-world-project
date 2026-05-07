import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
//import logo from './logo.png'

const Navbar = () => {
    const [visible,setVisible] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const {setShowSearch, getCartCount, getWishlistCount, token, setToken, navigate, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }
  return (
    <header className='border-b border-[#e6dcd2] bg-[#f6efe8]'>
      <div className='flex items-center justify-between px-0 py-4'>
        <Link to='/' className='flex items-center gap-3 pl-4 sm:pl-6'>
          <div className='flex flex-col leading-none'>
            <span className='text-lg font-semibold uppercase tracking-[0.3em] text-slate-800'>
              Shri Sai Cosmetic
            </span>
            <span className='mt-1 h-[2px] w-16 bg-[#d8c7b7]' />
          </div>
        </Link>

        <nav className='hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-slate-700 lg:flex'>
          <NavLink to='/' className="group flex items-center gap-2">
            <svg className="h-4 w-4 text-[#c6a47e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 11.5 12 4l9 7.5v7.5a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
            </svg>
            <span>Home</span>
          </NavLink>
          <NavLink to='/collection' className="group flex items-center gap-2">
            <svg className="h-4 w-4 text-[#c6a47e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Collection</span>
          </NavLink>
          <NavLink to='/about' className="group flex items-center gap-2">
            <svg className="h-4 w-4 text-[#c6a47e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01M11 12h1v4h1" />
            </svg>
            <span>About Us</span>
          </NavLink>
          <NavLink to='/contact' className="group flex items-center gap-2">
            <svg className="h-4 w-4 text-[#c6a47e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 5h16v14H4z" />
              <path d="m4 6 8 6 8-6" />
            </svg>
            <span>Contact</span>
          </NavLink>
        </nav>

        <div className='flex items-center gap-5 pr-4 sm:pr-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
          <Link
            to='/wishlist'
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c7b7] bg-white text-slate-700 transition hover:bg-[#f2e7dc]"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e34d4d] text-[9px] font-semibold text-white'>
              {getWishlistCount()}
            </span>
          </Link>
          <div className='relative'>
              {token ? (
                  <button onClick={() => setProfileOpen(open => !open)} className="p-0 border-none bg-transparent">
                      <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />
                  </button>
              ) : (
                  <Link to='/login'><img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" /></Link>
              )}
              {profileOpen && (
                  <div className='absolute right-0 pt-4'>
                      <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                          <p className='cursor-pointer hover:text-black'>My Profile</p>
                          <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                          <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                      </div>
                  </div>
              )}
          </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
            <p className='absolute right-[-6px] top-[-6px] w-4 text-center leading-4 bg-[#e34d4d] text-white aspect-square rounded-full text-[8px]'>
              {getCartCount()}
            </p>
          </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer lg:hidden" />
        </div>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
