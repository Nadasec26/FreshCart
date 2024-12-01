/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext';

export default function Chekout() {
    let { chekout , cardId} = useContext(CartContext);

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },

        onSubmit: () => handleChekout(cardId, "http://localhost:5173")
    })

    async function handleChekout(cardId ,url,formData) {
        let {data} = await chekout(cardId, url, formik.values)
        console.log(data.session.url);
        window.location.href = data.session.url
    }
    

    return (
        <div>
            <h1 className='font-bold text-2xl text-emerald-600'>ChekOut Now..</h1>
            <form className="max-w-lg my-5 mx-auto" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        type="text"
                        name="details"
                        id="details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="details" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details</label>
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
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        type="text"
                        name="city"
                        id="city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label htmlFor="city" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
                </div>
                <div className='flex gap-4 items-center'>
                    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Chekout
                    </button>
                </div>
            </form>
        </div>

    )
}
