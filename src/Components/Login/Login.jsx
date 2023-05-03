import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Video from '../../assets/Video.mp4'
import Nav from '../User/Layout/Nav'
// import axios from 'axios'
import { userContext } from '../../Store/Context'
// import { userUrl, turfOwnerUrl } from '../../API/API.js'
import { Axiosuser,AxiosTurfOwner } from '../../API/AxiosInstance'
import { toast, Toaster } from 'react-hot-toast'



function Login() {
    const { user, setUser } = useContext(userContext)
    const userCheck = () => {
        user === 'user' ? Navigate('/') : (user === 'turfOwner' ? Navigate('/') : Navigate('/login'))
    }
    useEffect(() => {
        userCheck()
    }, [])

    const Navigate = useNavigate()
    const [loginForm, setLoginForm] = useState('client')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState('')

    const userData = {
        email,
        password
    }
    const turfOwnerData = {
        email,
        password
    }

    const userLogin = (e) => {
        e.preventDefault()
        Axiosuser.post(`login`, userData).then((response) => {
            console.log(response)
            if (response.data.logIn) {
                localStorage.setItem('userToken', response.data?.token)
                // setUser('user')
                Navigate('/')
            }
            response.data.incPass && toast.error("Invalid Password")
            response.data.block && toast.error("Blocked Account")
            response.data.noUser && toast.error("No User Exist ")
        }).catch((error) => {
            console.log(error)
            toast.error("Error Occured Please Try Later")
        })
    }

    const turfLogin = (e) => {
        e.preventDefault()
        AxiosTurfOwner.post(`logIn`, turfOwnerData).then((response) => {
            if (response.data.status === 'Success') {
                localStorage.setItem('turfToken', response.data.token)
                // setUser('turfOwner')
                Navigate('/turfOwner/dashBoard')
            }
            response.data.status === 'Pending' && Navigate('/turfOwner/verification')
            response.data.status === 'Rejected' && Navigate('/turfOwner/rejected', { state: { id: response.data.id } })
            response.data.status === 'error' && toast.error('Invalid password')
            response.data.status === 'noUser' && toast.error('No user with this email')
            response.data.status === 'block' && toast.error('Your Account is Blocked')
        })
    }

    const forgotPass = (e) => {
        e.preventDefault()
       Axiosuser.post(`forgotPassword`, { email }).then((response) => {
            response.data.otpSent ? setLoginForm('reset-password') : (response.data.userErr ? toast.error("Invaild Email") : toast.error("Sending OTP Failed"))
        }).catch(() => {
            toast.error("An Error Occured")
        })
    }

    const resetPassword = (e) => {
        e.preventDefault()
        Axiosuser.post(`resetPassword`, { otp, email, password }).then((response) => {
            response.data.reset ? setLoginForm("client") : toast.error("Invalid OTP")
        }).catch(() => {
            toast.error('An Error Occured')
        })
    }

    return (
        <>
            <Nav />
            <div className="relative min-h-screen -z-5">
                <Toaster />
                <video
                    className="absolute top-0 left-0 w-full h-full inset-0 z-0 object-cover"
                    src={Video}
                    type="video/mp4"
                    muted
                    autoPlay
                    loop
                ></video>
                <div className="relative z-10 container mx-auto px-4 h-full">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className=" w-full lg:w-4/12 px-4">
                                <div className="bg-slate-100 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-32">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className={`${loginForm === 'forgot-pass' && 'hidden'} ${loginForm === 'reset-password' && 'hidden'} `}>
                                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                                <small>Select Your Account</small>
                                            </div>

                                            <div className="flex justify-center mt-8">
                                                <div className="mt-3 md:flex md:items-center md:-mx-2">
                                                    <button
                                                        className={` hover:bg-blue-800 text-black font-medium py-2 px-4 rounded ${loginForm === 'client' ? "sign-up" : "border border-blue-500 text text-blue-500"} rounded-md md:w-auto md:mx-2 focus:outline-none`}
                                                        onClick={() => setLoginForm('client')}
                                                    >
                                                        <span >Users</span>
                                                    </button>
                                                    <button
                                                        className={` hover:bg-blue-800  text-black font-medium  py-2 px-4 rounded ml-4 ${loginForm === 'turfOwner' ? "sign-up" : "border border-blue-500 text text-blue-800"} rounded-md md:w-auto md:mx-2 focus:outline-none`}
                                                        onClick={() => setLoginForm('turfOwner')}
                                                    >
                                                        Turf Owners
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {loginForm === 'client' && <form onSubmit={userLogin}>
                                        <div className="text-center mb-3">
                                            <h6 className="text-blueGray-500 text-sm font-bold">
                                                Login with
                                            </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <button
                                                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                                type="button"
                                            // onClick={google}
                                            >
                                                Google
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                                <small>Or Login with Users Credentials</small>
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    required
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    required
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap mt-6 relative">
                                                <div className="w-1/2">
                                                    <a
                                                        href="#pablo"
                                                        onClick={() => setLoginForm('forgot-pass')}
                                                        className="text-blueGray-200"
                                                    >
                                                        <small>Forgot password?</small>
                                                    </a>
                                                </div>
                                                <div className="w-1/2 text-right">
                                                    <small className="text-blueGray-200"
                                                        onClick={() => Navigate("/signUp")}>
                                                        Create new account</small>
                                                </div>
                                            </div>
                                        </div>
                                    </form>}
                                    {loginForm === 'turfOwner' && <form onSubmit={turfLogin}>
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                                {/* <small>Or login with credentials</small> */}
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Turf Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    required
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    required
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap mt-6 relative">
                                                <div className="w-1/2">
                                                    <a
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                        className="text-blueGray-200"
                                                    >
                                                        <small>Forgot password?</small>
                                                    </a>
                                                </div>
                                                <div className="w-1/2 text-right">
                                                    <small className="text-blueGray-200"
                                                        onClick={() => Navigate("/signUp")}>
                                                        Create new account</small>
                                                </div>
                                            </div>
                                        </div>
                                    </form>}
                                    {loginForm == 'forgot-pass' && <form onSubmit={forgotPass}>
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Enter your Registered Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    required
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Get OTP
                                                </button>
                                            </div>
                                        </div>
                                    </form>}
                                    {loginForm === 'reset-password' && <form onSubmit={resetPassword}>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Enter The OTP sent to given Email
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="000-000"
                                                onChange={(e) => setOtp(e.target.value)}
                                            />

                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Type new Password</label>
                                            <input 
                                            type="password" 
                                            placeholder="Enter your password" 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>    
                                    </form>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login