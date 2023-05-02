import React, { useState, useEffect } from 'react'
import Video from '../../../assets/Video.mp4'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { userUrl } from '../../../API/API'

function SignUp() {
  const [signUpForm, setSignUpForm] = useState("client")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState()
  const [loading, setLoading] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [otp, setOtp] = useState("")
  const [seconds, setSeconds] = useState(30)
  const Navigate = useNavigate()


  const userData = {
    name,
    email,
    password,
    confirmPassword,
    phone
  }
  useEffect(() => {
    if (signUpForm === 'otp') {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval)
          } else {
            setSeconds(59)
            setMinutes(minutes - 1)
          }
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [seconds, signUpForm])





  const sendOtp = (e) => {
    e.preventDefault();
    
    if (password === confirmPassword) {
      // setLoading(true)
      axios.post(`${userUrl}getOtp`, userData).then((response) => {
        response.data.userExist ? toast.error('User Already Exist') : setSignUpForm('otp')
        //  if(response.data.userExist){
        //     toast.error('User Already Exist')
        //  }
      }).catch((err) => {
        toast.error('Some Unexpected error')
      })
      // .finally(() => setLoading(false))
    } else {
      toast.error("Password doesnt Match")
    }
  }
  const signUpAndOtpVerify = (e) => {
    e.preventDefault()

    // setLoading(true)
    axios.post(`${userUrl}signUp`, { userData, otp }).then((response) => {
      console.log(response.data.status)
      response.data.status ? Navigate('/login') : toast.error('Incorrect otp')
    }).catch(() => {
      toast.error('some unexpected errors please try after some time')
    })
    // .finally(() => setLoading(false))
  }

  const resendOtp=()=>{
    setMinutes(0)
    setSeconds(30)
    axios.post(`${userUrl}resendOtp`,{email}).then((response)=>{
      response.data.status && toast.success("OTP has sent to your Email")
    })
  }


  return (
    <>
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
        {/* {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>} */}
        {signUpForm === 'client' &&
          <form onSubmit={sendOtp}>
            <div className='absolute w-full h-full'>
              <div className="bg-green-700 container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-screen">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="bg-slate-100 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-32 ">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-sm font-bold">
                            Sign UP
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                          {/* <small>Or sign up with credentials</small> */}
                        </div>
                        {/* <form onSubmit={sendOtp}> */}
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            value={name}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
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
                          {
                            password.length < 6 ? <label className='text-red-600'>Password should be atleast 6 letters in length</label> : null
                          }
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            required
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />

                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Phone Number
                          </label>
                          <input
                            type="number"
                            value={phone}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Create Account
                          </button>
                        </div>

                        <div className="flex flex-wrap mt-6">
                          <div className="w-1/2">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              className="text-black"
                            >
                              <small>Forgot password?</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
        {
          signUpForm === 'otp' && <form onSubmit={signUpAndOtpVerify}>
            <div className="relative z-10 container mx-auto px-4 h-full">
              <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                  <div className=" w-full lg:w-4/12 px-4">
                    <div className="bg-slate-100 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-32">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-sm font-bold">
                            OTP Verification
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                          
                        </div>

                        <div className="relative w-full mb-3 text-center">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Enter the OTP
                          </label>
                          <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-center"
                            placeholder="Enter the OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"

                          >
                            Verify OTP
                          </button>
                        </div>

                        {seconds > 0 || minutes > 0 ? (
                          <p className='text-danger'>
                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                            :{seconds < 10 ? `0${seconds}` : seconds}
                          </p>
                        ) : (
                          <p
                            className="text-primary"
                            onClick={resendOtp}
                            style={{ cursor: "pointer" }}
                          >
                            Resend Otp
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>}
      </div>
    </>
  )
}


export default SignUp