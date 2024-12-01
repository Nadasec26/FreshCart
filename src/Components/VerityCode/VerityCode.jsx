/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function VerityCode() {

    let navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)

    function handleCode(values) {
        setisLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then((res) => {
                setisLoading(false);
                console.log(res)
                // localStorage.setItem("userToken", res.data.token);
                toast.success("Go To reset password")
                navigate("/resetpassword")
            }
        )
            .catch((err) => {
                setisLoading(false);
                console.log(err)
                toast.error(err.response?.data.message)
            }
        )
    }

    let validationSchema = Yup.object().shape({
        resetCode: Yup.string()
        .matches(/^[0-9]{6}$/,"invaild OTP")
        .required("Reset Code is Required"),
    })

    let formik = useFormik({
        initialValues: {
            resetCode:"",
        },
        validationSchema,
        onSubmit: (values) => {
            handleCode(values);
        }
    })

    return <>
        <h1 className='text-3xl capitalize font-semibold mt-10 flex items-start font-mono text-emerald-600'>please enter your verification code</h1>
        <form className="max-w-lg my-5 mx-auto" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.resetCode}
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label htmlFor="resetCode" className="left-0 peer-focus:font-medium absolute text-sm text-emerald-600 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your resetCode</label>
                {formik.errors.resetCode && formik.touched.resetCode ? (
                    <span className='text-red-400'>{formik.errors.resetCode}</span>
                ) : null
                }
            </div>
                <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Reset newPassword"}
                </button>
        </form>
    </>
}
