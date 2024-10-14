import React from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
  if(localStorage.getItem("userToken")){
    return props.children
  }else{
    return <Navigate to={"/login"} />
  }
}
