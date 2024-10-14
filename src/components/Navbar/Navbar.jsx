import React, { useContext } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {

  let {numberItems,count} = useContext(CartContext)
  let {userLogin, setuserLogin} = useContext(UserContext)
  let nav = useNavigate()


  function signOut(){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    nav("./login")
  }

  return <>
      

      <nav className="bg-gray-200 border-gray-200 fixed top-0 right-0 left-0 z-10">
          <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
              <div className="flex gap-5 items-center">
              <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={logo} width="130px" className="h-8" alt="Flowbite Logo" />
              </Link>
             {userLogin != null ? <>
              <ul className='flex gap-4'>
                <li><Link to="">Home</Link></li>
                <li><Link to="products">Products</Link></li>
                <li><Link to="categories">Categories</Link></li>
                <li><Link to="brands">Brand</Link></li>
                
              </ul>
             </> : null }
              </div>
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="cart">
                <div className="icons flex gap-4 text-3xl">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="bg-emerald-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 translate-x-1/2 left-auto top-4 ms-3">{numberItems}</span>
                </div>
                </Link>
                <Link to="wishlist">
                <div className="icons flex gap-4 text-3xl">
                    <i className="fa-solid fa-heart"></i>
                    <span className="bg-emerald-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full px-2 absolute -translate-y-1/2 translate-x-1/2 left-auto top-4 ms-3">{count}</span>
                </div>
                </Link>
                <div className="links flex gap-4">
                  {userLogin != null ? <span onClick={signOut} className="text-sm cursor-pointer">SignOut</span> :
                  <>
                  <Link to="login" className="text-sm ">Login</Link>
                  <Link to="register" className="text-sm ">Register</Link>
                  </>
                  }
                
                
                </div>
              </div>
          </div>
      </nav>


  </>
}
