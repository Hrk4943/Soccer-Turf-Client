import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminUrl } from '../../../API/API'
import Video from '../../../assets/Home.mp4'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const Navigate=useNavigate()

    const adminLogin=(e)=>{
        e.preventDefault()
        axios.post(`${adminUrl}login`,{email,password}).then((response)=>{
            response.data.token && localStorage.setItem('adminToken',response.data.token)
            Navigate('/admin/home')
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        const headers={authorization:token}
        axios.get(`${adminUrl}authenticate`,{headers}).then((response)=>{
            response.status === 200 ? Navigate('/admin/home'):Navigate('/admin')
        }).catch((err)=>{
            console.log(err)
            err?.response?.status===400 ? Navigate('/admin'):toast.error('An error Occured')
        })
    },[])

  return (
    <>
    <div className="relative min-h-screen -z-5 ">
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
          <div className="w-full lg:w-4/12 px-4">
            <div className="bg-slate-100  mt-32 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <form onSubmit={adminLogin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
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
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    </div>

    </>
  )
}
