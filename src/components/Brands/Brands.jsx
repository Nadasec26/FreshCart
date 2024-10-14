import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'



export default function Brands() {
  const [brands, setbrands] = useState([])
  function getBrands(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => {
      console.log(res.data);
      
      setbrands(res.data.data)
    }).catch((res) => {})
  }


  useEffect(() => {
    getBrands()
  },[])


  return <>
    <h1 className='text-emerald-800 text-5xl font-bold my-8'>All Brands</h1>
    <div className="row">
      {brands.map((pro) => (
        <div key={pro._id} className='w-1/4 p-2'>
          <div className="brand my-2 border border-gray-300 p-4 hover:shadow-xl">
            <img src={pro.image} alt="" />
            <h3>{pro.name}</h3>
          </div>
        </div>
      ))
      }
    </div>
  </>
}
