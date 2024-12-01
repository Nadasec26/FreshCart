/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function ResetPassword() {

    let navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)


    function handleNewPassword(values) {
        setisLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            .then((res) => {
                setisLoading(false)
                console.log(res);
                localStorage.setItem("userToken", res.data.token);
                navigate(`/login`)
                toast.success("Welcome Back To Home :)")
            })
            .catch((err) => {
                setisLoading(false)
                console.log(err);
                toast.error(err.response?.data.message)
        })
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("invaild Email").required("Email is Required"),
        newPassword: Yup.string()
            .matches(/^[A-Za-z0-9]{6,10}$/, "invaild Password")
            .required("New Password is Required"),
    })

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword:"",
        },
        validationSchema,
        onSubmit: (values) => {
            handleNewPassword(values);
        }
    })

    return <>
        <h1 className='font-bold text-2xl text-emerald-600'>Reset Password...</h1>
        <form className="max-w-lg my-5 mx-auto" onSubmit={formik.handleSubmit}>
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
                    <span className='text-red-400'>{formik.errors.email}</span>
                ) : null
                }
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label htmlFor="newPassword" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your NewPassword</label>
                {formik.errors.newPassword && formik.touched.newPassword ? (
                    <span className='text-red-400'>{formik.errors.newPassword}</span>
                ) : null
                }
            </div>
            <div className='flex gap-4 items-center'>
                <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Done"}
                </button>
            </div>
        </form>
    </>
}
