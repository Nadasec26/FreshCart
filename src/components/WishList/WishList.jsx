import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext';


export default function WishList() {
  let {getLoggedWishList,deleteWishListItems,count,setcount} = useContext(CartContext);
  const [DetailWishList, setDetailWishList] = useState(null)
  let {addProdToCart, numberItems, setnumberItems} = useContext(CartContext);



  async function addToCart(id){
    let response = await addProdToCart(id)
    if(response.data.status == "success"){
      setnumberItems( numberItems + 1 )
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  }


  async function getWishListItems() {
    let response = await getLoggedWishList();

    if(response.data.status == "success"){
      // console.log(response.data);
      
      setDetailWishList(response.data.data)
    }

  }

  async function deleteItems(productId) {
    let response = await deleteWishListItems(productId);
    console.log(response.data.data);
    if(response.data.status == "success"){
      setcount( count - 1 )
      setDetailWishList(response.data.data)
    }
  }

  useEffect(() => {
    getWishListItems();
    // (productId) => {
    //   deleteItems(productId)
    // }

  },[DetailWishList])
  return <>
    {DetailWishList?.length > 0 ? 
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            My wish List
          </th>
        </tr>
      </thead>
      <tbody>
      {DetailWishList?.map((product) =>
        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.title}
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.price}
          </td>
          <td className="px-6 py-4">
          <span onClick={() => deleteItems(product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
          </td>
          <td className="px-6 py-4">
          <span onClick={() => addToCart(product.id)} className=" cursor-pointer font-medium text-emerald-800 hover:text-emerald-600 hover:underline">add to cart</span>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div> : <h1 className='capitalize text-red-800 font-bold text-3xl my-8'>no product added</h1>
    }


  </>
}
