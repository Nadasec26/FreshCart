/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Brands() {

  const [brands, setbrands] = useState([])

  async function getSubCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    console.log(data.data);
    setbrands(data.data);
  }

  useEffect(() => {
    getSubCategories();
  },[])

  return <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {brands?.map((brand) => (<div key={brand._id}
        className='border rounded-lg hover:shadow-md hover:shadow-green-300'>
        <img className="w-full h-[200px]" src={brand.image} alt="" />
        <h1 className=' p-2 text-gray-600'>{brand.name}</h1>
      </div>))}
    </div>
  </>
}
