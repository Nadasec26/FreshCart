/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Favorite() {
    let { getLoggedUserWishlist, deleteProductToWishlist, numderItemsWish, setnumderItemsWish } = useContext(WishlistContext);
    const [productDetails, setproductDetails] = useState(null)

    async function getToCard() {
        let response = await getLoggedUserWishlist();
        console.log(response.data.data);
        if (response.data.status == "success") {
            setproductDetails(response.data.data)
            console.log(productDetails);
            
        }
    }

    async function deleteProduct(id) {
        let response = await deleteProductToWishlist(id);
        console.log(response.data.data);

        if (response.data.status == "success") {
            setnumderItemsWish(numderItemsWish - 1)
            setproductDetails(response.data.data);
        }
    }

    useEffect(() => {
        getToCard();
        (id) => {
            deleteProduct(id)
        }
    }, [productDetails])
    return (
        <>
            {productDetails?.length > 0 ? <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails?.map((product) => <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.title}
                                </td>
                                {/* <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateProduct(product.product.id, product.count - 1)}
                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <span>{product.count}</span>
                                        </div>
                                        <button
                                            onClick={() => updateProduct(product.product.id, product.count + 1)}
                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td> */}
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={() => deleteProduct(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    {/* <Link to={`/chekout`}>
                        <button className='btn my-3'>ChechOut</button>
                    </Link> */}
                </div>
            </> : <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                    <span className="font-medium capitalize text-2xl">no product WishList now</span>
                </div>
            </div>
            }



        </>
    )
}
