/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { data } from 'autoprefixer';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// ncdncdsn


export default function AllOrders() {
  const [orders, setOrders] = useState([]);

    async function getAllOrders() {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders`);
      console.log(data.data);
      setOrders(data.data)
        
    }

    useEffect(() => {
        getAllOrders();
    },[])

  return <>
    <h1 className='font-bold text-2xl text-emerald-600'>AllOrders</h1>
    <div className="row">
      {orders.map((order) =>
        <div key={order.user._id} className='w-full'>
          <div className="order border-solid border-e-2 border-s-2 border-emerald-400 shadow hover:border-none hover:shadow-emerald-400  p-3 m-1">
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-600 text-xl font-mono
                font-semibold'>Name :</span> {order.user.name} </h3>
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-400 text-xl font-mono
                font-semibold'>Order Id  :</span> {order.id} </h3>
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-600 text-xl font-mono
                font-semibold'>Phone :</span> {order.user.phone} </h3>
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-400 text-xl font-mono 
              font-semibold'>Pay Type :</span> {order.paymentMethodType} </h3>
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-600 text-xl font-mono
                font-semibold'>Total Price :</span> $ {order.totalOrderPrice} </h3>
            <h3 className='text-lg capitalize text-gray-500'>
              <span className='text-emerald-400 text-xl font-mono 
              font-semibold'>Order Count :</span> {order.cartItems.length} </h3>
          </div>
        </div>
      )}
    </div>
  </>
  
}
