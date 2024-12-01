/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { WishlistContext } from '../../Context/WishlistContext'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: 'products', current: false },
  { name: 'Categories', href: 'categories', current: false },
  { name: 'Brands', href: 'brands', current: false },
]
const nav2=[
  { name: 'Login', href: 'login', current: false },
  { name: 'Register', href: 'register', current: false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  let navigate = useNavigate()
  let { userLogin, setuserLogin } = useContext(UserContext)
  let { numderItems } = useContext(CartContext)
  let {count} = useContext(WishlistContext)
  
  function sigOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate("/login")
  }
  
  return (
    <>
      


      <Disclosure as="nav" className="bg-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img src={logo} className="h-8" alt="Flowbite Logo" />
              </div>
              {userLogin != null ? <>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 my-12">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className='text-lg hover:border-solid hover:border-emerald-500 border-[1px] p-1 rounded-lg'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </> : null}
              
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
              {userLogin != null ? <>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <Link to="cart">
                    <div className="icons flex gap-4 text-3xl">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="bg-emerald-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 translate-x-1/2 left-auto top-4 ms-3">{numderItems}</span>
                    </div>
                  </Link>
                    <Link to="Favorite">
                      <div className="icons flex gap-4 text-3xl">
                          <i className="fa-solid fa-heart"></i>
                          <span className="bg-emerald-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 translate-x-1/2 left-auto top-4 ms-2">{count}</span>
                      </div>
                    </Link>
                  </div>
                  <span onClick={sigOut} className="text-sm cursor-pointer">SignOut</span>
                </div>
              </> : <>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 my-12 ms-32">
                      {nav2.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className='text-lg hover:border-solid hover:border-emerald-500 border-[1px] p-1 rounded-lg'
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
              </>
              }
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          {userLogin != null ? <>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link to={item.href}>
                  <DisclosureButton
                    key={item.name}
                    aria-current={item.current ? 'page' : undefined}
                    className='block w-[100%] text-lg hover:border-solid hover:border-emerald-500 border-[1px] p-1 rounded-lg'
                  >
                    {item.name}
                  </DisclosureButton>
                </Link>
              ))}
            </div>
          </> : <>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {nav2.map((item) => (
                  <Link to={item.href}>
                    <DisclosureButton
                      key={item.name}
                      aria-current={item.current ? 'page' : undefined}
                      className='block w-[100%] text-lg hover:border-solid hover:border-emerald-500 border-[1px] p-1 rounded-lg'
                    >
                      {item.name}
                    </DisclosureButton>
                  </Link>
                ))}
              </div>
          </>}
          
        </DisclosurePanel>
      </Disclosure>


      {/* <nav className="navbarStyle border-gray-200 bg-gray-200 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-52 text-base">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            </Link>
            {userLogin != null ? <><ul className='flex gap-4'>
              <li><Link to="">Home</Link></li>
              {/* <li><Link className='relative' to="cart">Cart
                {/* <div className='absolute top-[-18px] right-[-15px] size-5 text-white bg-emerald-600 rounded-full'>{numderItems }</div> 
              </Link></li> 
              <li><Link to="favorite">WishLlist</Link></li>
              <li><Link to="products">Products</Link></li>
              <li><Link to="categories">categories</Link></li>
              <li><Link to="brands">Brands</Link></li>
            </ul></>:null}
          </div>
            {/* <div className="flex items-center space-x-6 rtl:space-x-reverse"> */}
            {/* <div className="icon flex gap-4">
              <i className='fab fa-car'></i>
              <i className='fab fa-youtube'></i>
              <i className='fab fa-linkedin'></i>
              <i className='fab fa-twitter'></i>
            </div> *
            <div className="links flex gap-4">
              {userLogin != null ? <>
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <div>
                  <Link to={`/cart`}>
                  <svg className="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                    </svg>
                    </Link>
                  <div className='absolute top-[12px] right-[115px] size-5 text-white font-medium bg-emerald-600 rounded'>{numderItems}</div>
                </div>
                <span onClick={sigOut} className="text-sm cursor-pointer">SignOut</span> 
              </div>
              </> : <>
              <Link to="login" className="text-sm">Login</Link>
              <Link to="register" className="text-sm">Register</Link>
              </>
              }
            </div>
          {/* </div> *
        </div>
      </nav> */}
    </>
  )
}
