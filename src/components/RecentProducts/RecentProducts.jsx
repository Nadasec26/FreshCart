import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
// import axios from 'axios'
import { Link } from 'react-router-dom'
// import {useQuery} from '@tanstack/react-query'
import useProduct from '../../Hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';



export default function RecentProducts() {

  const [currentId, setcurrentId] = useState(0)
  const [Loading, setLoading] = useState(false)
  let {data, isError, error, isLoading} = useProduct()
  let {addProdToCart, numberItems, setnumberItems,addProdToWishList,count,setcount} = useContext(CartContext);
  const [liked, setLiked] = useState(false);
  const [wishListId, setwishListId] = useState(0)

  async function addToCart(id){
    setcurrentId(id)
    setLoading(true)
    let response = await addProdToCart(id)
    if(response.data.status == "success"){
      setnumberItems( numberItems + 1 )
      toast.success(response.data.message);
      setLoading(false)
    }else{
      toast.error(response.data.message);
      setLoading(false)
    }
  }
  async function addTowishlist(id){
    setwishListId(id)
    setLiked(!liked);
    let response = await addProdToWishList(id)
    console.log(response)
    if(response.data.status == "success"){
      setcount( count + 1 )
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  }

  

  if(isError){
    return <h1>{error}</h1>
  }

  if(isLoading){
    return <div className="spinner"></div>
  }


  return <>
      <div className="row">
         {data?.data?.data.map((pro)=> ( 
          <div key={pro.id} className='w-1/6'>
            <div className="product my-2 p-2">
            <div onClick={() => addTowishlist(pro.id)} className='text-2xl ms-28 z-0 relative top-10 cursor-pointer'>
              {liked && wishListId == pro.id ? <i className="fa-solid fa-heart" style={{color: '#d92020'}} /> : <i className="fa-regular fa-heart"  />
}
            </div>
            <Link to={`productdetails/${pro.id}/${pro.category.name}`}>
            <img src={pro.imageCover} className='w-full' alt="" />
            <h3 className='text-emerald-600'>{pro.category.name}</h3>
            <h2 className='font-semibold mb-1'>{pro.title.split(" ").slice(0,2).join(" ")}</h2>
            <div className='flex justify-between p-3'>
              <span>{pro.price} EGP</span>
              <span> <i className='fas fa-star text-yellow-400'></i> {pro.ratingsAverage}</span>
            </div>
            </Link>
            <button onClick={() => addToCart(pro.id)} className='btn'>{Loading && currentId == pro.id ? <i className='fas fa-spinner fa-spin'></i>: "Add To Cart"}</button>
          </div>
            
          </div> ))
          
          }
      </div>
  </>
}
