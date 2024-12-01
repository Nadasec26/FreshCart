/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React ,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';

export default function Register() {

    let { userLogin, setuserLogin } = useContext(UserContext)
    
    let navigate = useNavigate();
    const [ApieError, setApieError] = useState("")
    const [isLoading, setisLoading] = useState(false)

    function handleRegister(values) {
        setisLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then((res)=>{
            setisLoading(false)
            if (res.data.message == "success") {
                localStorage.setItem("userToken", res.data.token)
                setuserLogin(res.data.token)
                navigate("/")
            }
        })
        .catch((res)=>{
            setisLoading(false)
            setApieError(res.response.data.message)
        })
        }
    let validationSchema = Yup.object().shape({
        name:Yup.string()
        .min(3,"name is min 3")
        .max(10,"name is max 10")
        .required("name is requried"),
        email:Yup.string()
        .email("invaild email")
        .required("email is requried"),
        phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/,"invaild Phone Number")
        .required("phone is requried"),
        password:Yup.string()
        .matches(/^[A-Za-z0-9]{6,10}$/,"invaild Password")
        .required("Password is requried"),
        rePassword:Yup.string()
        .oneOf([Yup.ref("password")])
        .required("rePassword is requried")
    }) 
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword:"",
        },
        validationSchema,
        onSubmit: handleRegister
    }) 

    return (
        <div>
            {ApieError ? <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                    {ApieError}
                </div>
            </div>:null}
            <h1 className='font-bold text-2xl text-emerald-600'>Register Now..</h1>
            <form className="max-w-lg my-5 mx-auto" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type="text"
                    name="name" 
                    id="name" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" "/>
                    <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
                    {formik.errors.name && formik.touched.name ? (
                        <span className='text-red-400'>{formik.errors.name}</span>
                    ) : null
                    }
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                    {formik.errors.email && formik.touched.email ? (
                        <span className='text-red-400'>{ formik.errors.email }</span>
                    ) : null
                    }
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                    {formik.errors.phone && formik.touched.phone ? (
                        <span className='text-red-400'>{formik.errors.phone}</span>
                    ) : null
                    }
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
                    {formik.errors.password && formik.touched.password ? (
                        <span className='text-red-400'>{formik.errors.password}</span>
                    ) : null
                    }
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.rePassword}
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="rePassword" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your RePassword</label>
                    {formik.errors.rePassword && formik.touched.rePassword ? (
                        <span className='text-red-400'>{formik.errors.rePassword}</span>
                    ) : null
                    }
                </div>
                <div className='flex gap-4 items-center'>
                    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
                    </button>
                    <p>Do You Have Account<Link to={"/login"}><span className='ms-1 text-blue-400 underline'>Login Now</span></Link></p>
                </div>
            </form>
        </div>
        
    )
}
