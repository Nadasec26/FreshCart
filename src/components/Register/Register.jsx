import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Register() {

  let {userLogin, setuserLogin} = useContext(UserContext);
  const [ApiErrors, setApiErrors] = useState("")
  const [isLoadind, setisLoadind] = useState(false)
  const nav = useNavigate();

    function handleRegister(values){
      setisLoadind(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then((res) => {
          setisLoadind(false)
          if(res.data.message == "success"){
            localStorage.setItem("userToken", res.data.token)
            setuserLogin(res.data.token)
            nav("/")
          }
        }).catch((res) => {
          setisLoadind(false)
          // console.log(res.response.data.message);
          setApiErrors(res.response.data.message)
        })}

let validate = Yup.object().shape({
  name: Yup.string().min(3, "min length is 3").max(10, "max lenght is 10").required("name is required"),
  email:Yup.string().email("invild email").required("email is required"),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone num").required("phone is required"),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 char").required("password is reduired"),
  rePassword:Yup.string().oneOf([Yup.ref("password")], "repassword and passward not the same").required("repassword is required"),
});

  let formik = useFormik({
    initialValues: {
      name:"",
      email:"",
      phone:"",
      password:"",
      rePassword:"",
    },
    validationSchema: validate
    ,
    onSubmit: handleRegister
  })

  return <>
  <div className="my-5">
    {ApiErrors ?  <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
    {ApiErrors}
    </div> : null}
    <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Register Now</h2>
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name</label>
  </div>
   {formik.errors.name && formik.touched.name ? <div className="mr-96 text-red-800" role="alert">{formik.errors.name}</div> : null } 
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
      <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
   {formik.errors.email && formik.touched.email ? <div className="mr-96 text-red-800" role="alert">{formik.errors.email}</div> : null } 
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone</label>
  </div>
   {formik.errors.phone && formik.touched.phone ? <div className="mr-96 text-red-800" role="alert">{formik.errors.phone}</div> : null } 
   <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password</label>
  </div>
   {formik.errors.password && formik.touched.password ? <div className="mr-96 text-red-800" role="alert">{formik.errors.password}</div> : null } 
   <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="rePassword" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your rePassword</label>
  </div>
   {formik.errors.rePassword && formik.touched.rePassword ? <div className="mr-96 text-red-800" role="alert">{formik.errors.rePassword}</div> : null } 
    <div className='flex gap-4 items-center'>
    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-600 dark:focus:ring-emerald-800">
    {isLoadind ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
  </button>
  <span>Do you have an account <Link to={"/login"} className='text-blue-600 underline'>Login Now</Link> </span>
    </div>
  </form>
  </div>
  </>
    }
