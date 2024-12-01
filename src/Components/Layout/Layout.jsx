/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from "react-router-dom"
import Footer from '../Footer/Footer'
export default function Layout() {
  return (
    <>
        <Navbar />
        
        <div className="container py-16 md:py-10">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}
