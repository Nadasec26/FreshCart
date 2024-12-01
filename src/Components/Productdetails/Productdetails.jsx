/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function Productdetails() {
    let { addProductToCard, numderItems, setnumderItems } = useContext(CartContext);
    const [product, setproduct] = useState(null)
    const [relatedProducts, setrelatedProducts] = useState([])
    const [loading, setloading] = useState(false)
    const [currentid, setcurrentid] = useState(0)
    let {id,category} = useParams();
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

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

    function GetProduct(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then((res)=>{
            console.log(res.data.data);
            setproduct(res.data.data)
        })
        .catch((res)=>{
            console.log(res);
        })
    }
    function RelatedProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            console.log(res.data.data);
            let related = res.data.data.filter((product)=>product.category.name == category)
            setrelatedProducts(related);
        })
        .catch((res)=>{
            console.log(res);
        })
    }
    useEffect(() => {
        GetProduct(id);
        RelatedProducts();
    },[id,category])
    
    return (
        <>
            <div className="row items-center">
                <div className="lg:w-1/4 w-full">
                    <Slider {...settings}>
                        {product?.images.map((src) => <img src={src} className='w-full'></img>)}

                    </Slider>
                </div>
                <div className="lg:w-3/4 p-10">
                    <h1 className='font-bold flex items-left'>{product?.title}</h1>
                    <h3 className='text-gray-700 mt-4 flex items-left'>{product?.description}</h3>
                    <h3 className='mt-4 text-emerald-600 flex items-left'>{product?.category.name}</h3>
                    <div className="flex justify-between mt-4">
                        <span>{product?.price}EGP</span>
                        <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
                    </div>
                    <button className='btn' onClick={() => addCard(product.id)}>
                        {loading && currentid == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
                    </button>

                </div>
            </div>

            <div className="row">
                {relatedProducts.length > 0 ?relatedProducts.map((product) => (
                    <div key={product.id} className="lg:w-1/5 md:w-1/4 sm:w-1/2">
                        <div className="product p-3">
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img src={product.imageCover} className='w-full' alt="" />
                                <h3 className='text-emerald-600'>{product.category.name}</h3>
                                <h3 className='font-bold mb-3'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                <div className="flex justify-between mb-3">
                                    <span>{product.price}EGP</span>
                                    <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
                                </div>
                            </Link>
                            <button className='btn' onClick={() => addCard(product.id)}>
                                {loading && currentid == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
                            </button>
                        </div>
                    </div>
                )) : <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>}
            </div>
        </>
    )
}
