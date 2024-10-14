import React, { useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios';


export default function Allorders() {

  const [Orders, setOrders] = useState([])

  function getallOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    .then((res) => {
      console.log(res.data.data)
      setOrders(res.data.data)
    }).catch((err) => {
      //
    })

  }

  useEffect(() => {
    getallOrders()
  },[])
  return <>
  {Orders.map((order) => (
    <div key={order.user._id} className="m-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h1 className='text-emerald-600 font-medium text-3xl'>Name: <span className='text-gray-600 text-2xl'>{order.user.name}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>Phone: <span className='text-gray-600 text-2xl'>{order.user.phone}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>Pay Type: <span className='text-gray-600 text-2xl'>{order.paymentMethodType}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>Total Price: <span className='text-gray-600 text-2xl'>{order.totalOrderPrice}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>IsPaid: <span className='text-gray-600 text-2xl'>{order.isPaid}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>Id: <span className='text-gray-600 text-2xl'>{order.id}</span> </h1>
      <h1 className='text-emerald-600 font-medium text-3xl'>Created At: <span className='text-gray-600 text-2xl'>{order.createdAt}</span> </h1>
    </div>
    ))}

  </>
}
