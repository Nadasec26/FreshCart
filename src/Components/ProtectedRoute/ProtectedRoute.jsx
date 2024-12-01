/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken")) {
    return props.children
  }
  else {
    return <Navigate to={"/login"}/>
  }
}
