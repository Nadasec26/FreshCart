/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategorySlider() {

    const [categorys, setcategorys] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
    };

    function getCategory() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{
            console.log(res.data.data);
            setcategorys(res.data.data);
        })
        .catch((res)=>{
            console.log(res);
        })
    }

    useEffect(() => {
        getCategory();
    },[])
    return (
    <>
        <h1 className='font-bold flex items-left ms-10 my-5 text-gray-800'>Shop Popular Categories</h1>
        <Slider {...settings}>
                {categorys.map((category) => <div className=''>
                    <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
                <h3>{category.name}</h3>
                </div>
            )}
        </Slider>
    </>
    )
}
