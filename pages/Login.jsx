import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {
  const [currState,setCurrState] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
      if(currState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name, email, password
        });
        const data = response.data;
        if(data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          alert(data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email, password
        });
        const data = response.data;
        if(data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      alert("An error occurred. Please try again.");
    }
  }
  return (
    <div className='min-h-[80vh] bg-[#f6efe8] px-4 py-12'>
      <form
        onSubmit={onSubmitHandler}
        className='mx-auto w-full max-w-[460px] rounded-2xl border border-[#e6d8c8] bg-[#f4ede4] px-8 py-10 shadow-[0_18px_50px_rgba(59,44,35,0.12)]'
      >
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-[#2f2620]'>
            {currState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className='mt-2 text-sm text-[#6a5a4b]'>
            {currState === 'Login'
              ? 'Sign in to your account to continue'
              : 'Join us to discover curated beauty picks'}
          </p>
        </div>

        <div className='mt-8 space-y-5'>
          {currState !== 'Login' && (
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-[#3d322a]'>Full Name</label>
              <input
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Enter your name'
                className='w-full rounded-lg border border-[#d8c8b6] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79a78]'
                required
              />
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-[#3d322a]'>Email Address</label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Enter your email'
              className='w-full rounded-lg border border-[#d8c8b6] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79a78]'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-[#3d322a]'>Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Enter your password'
              className='w-full rounded-lg border border-[#d8c8b6] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79a78]'
              required
            />
            <p className='text-xs text-[#7d6b5b]'>Demo: Use "password" as password for any email</p>
          </div>
        </div>

        <div className='mt-3 flex items-center justify-between text-xs text-[#6a5a4b]'>
          <span className='cursor-pointer'>Forgot Your Password?</span>
          {currState === 'Login' ? (
            <button type='button' onClick={()=>setCurrState('Sign Up')} className='font-semibold text-[#8b6d4b]'>
              Create account
            </button>
          ) : (
            <button type='button' onClick={()=>setCurrState('Login')} className='font-semibold text-[#8b6d4b]'>
              Login Here
            </button>
          )}
        </div>

        <button
          type='submit'
          className='mt-6 w-full rounded-lg bg-[#c7ad86] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#b49872]'
        >
          {currState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        <div className='my-6 flex items-center gap-3 text-xs text-[#8b7b6c]'>
          <span className='h-[1px] flex-1 bg-[#d8c8b6]' />
          <span>OR CONTINUE WITH</span>
          <span className='h-[1px] flex-1 bg-[#d8c8b6]' />
        </div>

        <button
          type='button'
          className='flex w-full items-center justify-center gap-3 rounded-lg border border-[#d8c8b6] bg-white py-3 text-sm font-semibold text-[#3d322a] shadow-sm transition hover:bg-[#f9f5f0]'
        >
          <span className='text-base font-bold'>G</span>
          Continue with Google
        </button>

        <p className='mt-6 text-center text-xs text-[#6a5a4b]'>
          {currState === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          {currState === 'Login' ? (
            <button type='button' onClick={()=>setCurrState('Sign Up')} className='font-semibold text-[#8b6d4b]'>
              Sign up
            </button>
          ) : (
            <button type='button' onClick={()=>setCurrState('Login')} className='font-semibold text-[#8b6d4b]'>
              Sign in
            </button>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
