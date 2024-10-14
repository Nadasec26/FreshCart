import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import axios from 'axios'


export default function ProductDetails() {
  const [product, setproduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])
  let {id,category} = useParams()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
  };

  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res) => {
      setproduct(res.data.data)
    }).catch(() => {
        //
    })
  }

  function getAllProduct(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res) => {
      let related = res.data.data.filter((product) => product.category.name == category)
      setrelatedProduct(related)
    }).catch((res) => {
      //
    })
  }
  useEffect(() => {
    getProduct(id);
    getAllProduct();
  }, [id, category])

  return <>
    <div className="row items-center">
      <div className="w-1/4">
        <Slider {...settings}>
              {product?.images.map((src) => <img src={src} className='w-full' />)}
          </Slider>
      </div>
      <div className="w-3/4 p-4">
        <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
        <h4 className='text-gray-700 my-4'>{product?.description}</h4>
        <h4 className=''>{product?.category.name}</h4>
        <div className='flex justify-between p-3 my-5'>
            <span>{product?.price} EGP</span>
            <span> <i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
        </div>
        <button className='btn'>Add to Cart</button>
      </div>
    </div>

    <div className="row">
         {relatedProduct.length > 0 ? relatedProduct.map((pro)=> ( 
          <div key={pro.id} className='w-1/6'>
            <div className="product my-2 p-2">
            <Link to={`/productdetails/${pro.id}/${pro.category.name}`}>
            <img src={pro.imageCover} className='w-full' alt="" />
            <h3 className='text-emerald-600'>{pro.category.name}</h3>
            <h2 className='font-semibold mb-1'>{pro.title.split(" ").slice(0,2).join(" ")}</h2>
            <div className='flex justify-between p-3'>
              <span>{pro.price} EGP</span>
              <span> <i className='fas fa-star text-yellow-400'></i> {pro.ratingsAverage}</span>
            </div>
            </Link>
            <button className='btn'>Add to Cart</button>
          </div>
            
          </div> )) : 
          <div className="spinner"></div>
          }
      </div>
  </>
}
