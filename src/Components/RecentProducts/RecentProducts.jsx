/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts'
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'


export default function Products() {

  let { data, error, isError, isLoading } = useProducts();
  let { addProductToCard, numderItems, setnumderItems } = useContext(CartContext);
  let { addProductToWishlist, numderItemsWish, setnumderItemsWish } = useContext(WishlistContext);
  const [loading, setloading] = useState(false)
  const [currentid, setcurrentid] = useState(0)
  const [liked, setLiked] = useState(false);
  const [wishListId, setwishListId] = useState(0)
  
  async function addCard(id) {
    setcurrentid(id)
    setloading(true)
    let response = await addProductToCard(id)
    console.log(response);
    
    if (response.data.status == "success") {
      setnumderItems(numderItems + 1)
      toast.success(response.data.message)
      setloading(false)
    }
    else {
      toast.error(response.data.message)
      setloading(false)
    }
  }

  async function addWishlist(id) {
    setLiked(!liked);
    setwishListId(id)
    setloading(true)
    let response = await addProductToWishlist(id)
    console.log(response);

    if (response.data.status == "success") {
      setnumderItemsWish(numderItemsWish + 1)
      toast.success(response.data.message)
      setloading(false)
    }
    else {
      toast.error(response.data.message)
      setloading(false)
    }
  }

  if (isError) {
    return <h3 className='text-red-950'>{ error.message }</h3>
  }
  if (isLoading) {
    return <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
  }
  // const [products, setproducts] = useState([])

  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then((res)=>{
  //     setproducts(res.data.data)
  //   })
  //   .catch((res)=>{
  //     console.log(res);
      
  //   })
  // }

  // useEffect(() => {
  //   getProducts();
  // },[])

  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="lg:w-1/5 md:w-1/4 sm:w-1/2">
            <div className="product rounded-lg border-solid hover:shadow-lg hover:border-[1px] hover:border-emerald-500 p-3">
            <div onClick={() => addWishlist(product.id)} className='text-2xl ms-28 z-0 relative top-10 cursor-pointer'>
              {liked && wishListId == product.id ? <i className="fa-solid fa-heart" style={{color: '#d92020'}} /> : <i className="fa-regular fa-heart"  />
}
            </div>
              <Link to={`productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt="" />
              <h3 className='text-emerald-600'>{product.category.name }</h3>
              <h3 className='font-bold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
              <div className="flex justify-between mb-3">
                <span>{product.price}EGP</span>
                <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage }</span>
              </div>
              </Link>
              <div className='flex gap-4'>
                <button className='btn' onClick={() => addCard(product.id)}>
                {loading && currentid == product.id ?<i className='fas fa-spinner fa-spin'></i>:"Add To Cart"}
                </button>
                {/* <button onClick={() => addWishlist(product.id)}>
                  {loading && wishid == product.id ? <svg
                    className="w-8 h-8 cursor-pointer text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                    : <svg
                    className="w-8 h-8 cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>}
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
