/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { data } from 'autoprefixer';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [category, setcategory] = useState([])

  async function getAllCategories() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    console.log(data.data);
    setcategory(data.data);
  }

  useEffect(() => {
    getAllCategories();
  },[])

  return <>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {category?.map((category) => (<div key={category._id}
        className='border rounded-lg hover:shadow-md hover:shadow-green-300'>
        <img className="w-full h-[330px] object-cover" src={category.image} alt="" />
        <h1 className='text-3xl p-2 text-emerald-600 font-medium'>{category.name}</h1>
      </div> ))}
      </div>
  </>
}
