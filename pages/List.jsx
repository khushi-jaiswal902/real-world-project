import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const[list,setList]=useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log('Products response:', response.data);
      console.log('Response status:', response.status);
      console.log('Products count:', response.data.products?.length);
      
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
  } catch (error) {
      console.error('Error fetching list:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, {headers: {token}});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        console.error('Error removing product:', error);
        
        toast.error(error.message)
      }
  }
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center
        items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          list && list.length > 0 ? list.map((item, index) => (
            <div key={index} className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm'>
              <img src={item.image?.[0]} alt={item.name} className="w-12 h-12 object-cover" onError={(e) => {e.target.src = 'https://via.placeholder.com/50'}} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-center cursor-pointer'>X</p>
            </div>
          )) : <p className='text-gray-500'>No products found</p>
        }
      </div>
    </>
  )
}

export default List
