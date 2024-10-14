import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import ForgetPassward from './components/ForgetPassward/ForgetPassward'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import ResetPassword from './components/ResetPassword/ResetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders'



let query = new QueryClient(); 

let x =createBrowserRouter([
  {path:"", element: <Layout />, children: [
    {index: true , element: <ProtectedRoute> <Home /></ProtectedRoute> },
    {path: "cart" , element: <ProtectedRoute><Cart /></ProtectedRoute> },
    {path: "wishlist" , element: <ProtectedRoute><WishList /></ProtectedRoute> },
    {path: "brands" , element: <ProtectedRoute><Brands /></ProtectedRoute> },
    {path: "productdetails/:id/:category" , element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
    {path: "categories" , element: <ProtectedRoute><Categories /></ProtectedRoute> },
    {path: "login" , element: <Login /> },
    {path: "forgetpassward" , element: <ForgetPassward /> },
    {path: "verifycode" , element: <VerifyCode /> },
    {path: "resetpassword" , element: <ResetPassword /> },
    {path: "products" , element: <ProtectedRoute><Products /></ProtectedRoute> },
    {path: "checkout" , element: <ProtectedRoute><Checkout /></ProtectedRoute> },
    {path: "allorders" , element: <ProtectedRoute><Allorders /></ProtectedRoute> },
    {path: "register" , element: <Register /> },
    {path: "*" , element: <Notfound /> },

  ]}
])
function App() {
  const [count, setCount] = useState(0)


  return <>
   <UserContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
    <RouterProvider router={x}></RouterProvider>
    <Toaster />
    </CartContextProvider>
    <ReactQueryDevtools />
    </QueryClientProvider>
  </UserContextProvider>
  </>
  
}

export default App
