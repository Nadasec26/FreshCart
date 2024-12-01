/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'


export default function Footer() {
  return (
    <>


      <footer className="bg-white rounded-lg dark:bg-gray-900 m-4 relative w-full ">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="Flowbite Logo" />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to={`/cart`} className="hover:underline me-4 md:me-6">Cart</Link>
              </li>
              <li>
                <Link to={`/products`} className="hover:underline me-4 md:me-6">Proucts</Link>
              </li>
              <li>
                <Link to={`/category`} className="hover:underline me-4 md:me-6">Categories</Link>
              </li>
              <li>
                <Link to={`/brands`} className="hover:underline">Brands</Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 FrechCart. All Rights Reserved.</span>
        </div>
      </footer>


        {/* <div className="text-white bg-green-400 fixed p-3 bottom-0 left-0 right-0">
            <h1 className='font-bold text-white'>footer</h1>
        </div> */}
    </>
  )
}
