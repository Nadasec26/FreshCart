import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'


export default function Categories() {
  const [category, setcategory] = useState([])
  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((res) => {
      console.log(res.data);
      
      setcategory(res.data.data)
    }).catch((res) => {})
  }


  useEffect(() => {
    getCategories()
  },[])

  return <>
    <div className="row">
      {category.map((pro) => (
        <div key={pro._id} className='w-1/3 p-2'>
          <div className="brand border border-gray-300 hover:shadow-2xl rounded">
            <img className='w-full h-[400px] object-cover' src={pro.image} alt="" />
            <div className='p-6'>
              <h3 className='text-emerald-800 font-semibold text-3xl'>{pro.name}</h3>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  </>
}
