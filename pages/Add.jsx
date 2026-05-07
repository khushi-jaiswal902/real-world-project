// ...existing code...
import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = () => {
  const [images, setImages] = useState(Array(12).fill(null));
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("Skin Care");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handleSubmit called', { productName, price, category, subCategory, sizes, bestSeller, images });
    const token = localStorage.getItem('token');
    console.log('token:', token);
    if (!token) {
      toast.error('No token found — please login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller ? 'true' : 'false');
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("token", token);

      for (let i = 0; i < 12; i++) {
        if (images[i]) {
          formData.append(`image${i + 1}`, images[i]);
        }
      }

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
            'x-auth-token': token,
            token: token
          }
        }
      );

      console.log('response.data:', response.data);
      toast.success('Product added');
      
      // Reset form fields
      setImages(Array(12).fill(null));
      setProductName("");
      setDescription("");
      setCategory("Men");
      setPrice("");
      setSubCategory("Skin Care");
      setBestSeller(false);
      setSizes([]);
    } catch (error) {
      console.error('axios error:', error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  // ...existing code...

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      <p className='mb-2'>Upload Image</p>
      <div className='flex gap-2 flex-wrap'>
        {Array.from({length: 12}).map((_, index) => (
          <label key={index} htmlFor={`image${index + 1}`}> 
            <img src={!images[index] ? assets.upload_area : URL.createObjectURL(images[index])} alt="" className="w-20 cursor-pointer" />
            <input type="file" id={`image${index + 1}`} accept="image/*" hidden onChange={(e) => handleImageChange(index, e)}/>
          </label>
        ))}
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input 
          type="text" 
          placeholder="Product name" 
          className="border border-gray-300 rounded-md p-2 w-full"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <input 
          type="text" 
          placeholder="Product description" 
          className="border border-gray-300 rounded-md p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <p className='mb-2'>Product category</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub category</p>
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="Skin Care">Skin Care</option>
          <option value="Makeup">Makeup</option>
          <option value="Body Care">Body Care</option>
          <option value="Hair Care">Hair Care</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='25' className='w-full px-3 py-2 sm:w-[120px]'/>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S" ) : [...prev, "S"])} >
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
           <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M" ) : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer `}>M</p>
          </div>
           <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L" ) : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100 " : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
           <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL" ) : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100 " : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL" ) : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id="bestSeller"/>
        <label className="cursor-pointer" htmlFor="bestSeller">Best Seller</label>
      </div>
      <button type='submit' className='bg-black text-white px-4 py-2 rounded-md'>Add Product</button>
    </form>
  )
}

export default Add
// ...existing code...