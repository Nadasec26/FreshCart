/* eslint-disable no-unused-vars */
import { Children, useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import UserContextProdiver from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Productdetails from './Components/Productdetails/Productdetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import CartContextProvider from './Context/CartContext';
import Chekout from './Components/Chekout/Chekout';
import AllOrders from './Components/AllOrders/AllOrders';
import Favorite from './Components/Favorite/Favorite';
import WishlistContextProvider from './Context/WishlistContext';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import VerityCode from './Components/VerityCode/VerityCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Notfound from './Components/Notfound/Notfound';
// import {AllOrders ,Cart} from './Components/path'



let query =new QueryClient();
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute> <Productdetails /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "chekout", element: <ProtectedRoute><Chekout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path:"brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute>  },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "resetcode", element: <VerityCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "favorite", element: <Favorite /> },
      { path: "*", element: <Notfound /> },
      ]},
])
function App() {
  return <UserContextProdiver>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishlistContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster />
        </WishlistContextProvider>
      </CartContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </UserContextProdiver>
}

export default App
