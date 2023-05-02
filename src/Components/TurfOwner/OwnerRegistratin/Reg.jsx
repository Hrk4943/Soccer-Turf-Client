import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { turfOwnerUrl } from '../../../API/API'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Content from './Content'
import Banner from './Banner'
import Video from '../../../assets/Video.mp4'



export default function Reg() {
  const [name, setName] = useState("")
  const [courtName, setCourtName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [number, setNumber] = useState('')
  const [sportsEvent, setSportsEvent] = useState('')
  const [location, setLocation] = useState('')
  const [district, setDistrict] = useState('')
  const [price, setPrice] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState([])
  const [otp, setOtp] = useState("")
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [registerForm, setRegisterForm] = useState('owner')
  const Navigate = useNavigate()

  useEffect(() => {
    if (registerForm === 'otp') {
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
  }, [seconds, registerForm])



  const turfData = {
    name,
    courtName,
    email,
    password,
    confirmPassword,
    number,
    location,
    price,
    sportsEvent,
    district,
    state,
    openingTime,
    closingTime
  }

  const turfOwnerOtp = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      axios.post(`${turfOwnerUrl}turfOtp`, { email: turfData.email }).then((response) => {
        !response.data.userExist ? setRegisterForm('otp') : toast.error("Email Already Exist")
      }).catch(() => {
        toast.error('An Error Occured')
      })
    } else {
      toast.error("Passwords doesnt match")
    }
  }


  const handleimage = async (e) => {
    console.log("aaaaaaaaaa")
    const files = e.target.files
    console.log(files, "//////")
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        const base64s = reader.result;
        imagesArray.push(base64s);
        setImage(imagesArray)
      }

    }
  }
  const turfRegisterAndOtpVerify = async (e) => {
    e.preventDefault();
    console.log(image, "base54")
    await axios.post(`${turfOwnerUrl}turf-signUp`, { turfData, otp, image }).then((response)=>{
      response.data.signUp ? Navigate('/login') : null
   }).catch(()=>{
       toast.error('An Error Occured')
   })
    console.log("here")
    Navigate('/login')
  }

  const resendOtp = () => {
    setMinutes(0)
    setSeconds(30)
    axios.post(`${turfOwnerUrl}resendOtp`, { email: turfData.email }).then((response) => {
      response.data.otpSent && toast.success("OTP has sent to your Email")
    }).catch(() => {
      toast.error('An Error Occured')
    })
  }

  return (
    <>
      {registerForm === 'owner' && <form onSubmit={turfOwnerOtp}>
        <Banner />
        <Content />
        <div class="flex justify-center items-center w-full h-screen bg-white mt-32">
          {/* COMPONENT CODE  */}
          <div class="container mx-auto my-4 px-4 lg:px-20">
            <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto bg-green-100 rounded-2xl shadow-2xl">
              <div class="flex">
                <h1 class="font-bold uppercase text-4xl">Lets <br /> Collaborate</h1>
              </div>

              <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Your Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Turf Name*"
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                />

                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Enter Your Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Enter Your Mobile Number*"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Sports Events You Provide*"
                  value={sportsEvent}
                  onChange={(e) => setSportsEvent(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Opening Time*"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Closing Time*"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Your Loaction*"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="District*"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="State*"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter the Price*"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input class="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="file"
                  placeholder="Image*"
                  onChange={handleimage}
                  multiple
                />

              </div>
              <div class="my-2 w-1/2 lg:w-1/4">
                <button type='submit' class=" uppercase text-sm  font-bold tracking-wide bg-green-500 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
                  Register
                </button>
              </div>
            </div>
            <div
              class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-green-300 rounded-2xl">
              <div class="flex flex-col text-white">
                <h1 class="font-bold uppercase text-2xl my-4">Drop in our office</h1>
                <p class="text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                  tincidunt arcu diam,
                  eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
                </p>
                <div class="flex my-4 w-2/3 lg:w-1/2">
                  <div class="flex flex-col">
                    <i class="fas fa-map-marker-alt pt-2 pr-2" />
                  </div>
                  <div class="flex flex-col">
                    <h2 class="text-2xl">Main Office</h2>
                    <p class="text-gray-900">Malappuram,Kerala,India</p>
                  </div>
                </div>
                <div class="flex my-4 w-2/3 lg:w-1/2">
                  <div class="flex flex-col">
                    <i class="fas fa-phone-alt pt-2 pr-2" />
                  </div>
                  <div class="flex flex-col">
                    <h2 class="text-2xl">Call Us</h2>
                    <p class="text-gray-900">Tel: xxx-xxx-xxx</p>
                    <p class="text-gray-900">Fax: xxx-xxx-xxx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* COMPONENT CODE  */}
        </div>
      </form>
      }
      {registerForm === 'otp' && <form onSubmit={turfRegisterAndOtpVerify}>
        <video
          className="absolute inset-0 z-0 object-cover"
          src={Video}
          type="video/mp4"
          muted
          autoPlay
          loop
        ></video>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0 mt-40">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      Can you enter the OTP sent to your mail?
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      OTP
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="OTP"
                      style={{ transition: "all .15s ease" }}
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    // onClick={handleClick}
                    >
                      Verify OTP
                    </button>
                  </div>
                  {/* {seconds > 0 || minutes > 0 ? (
                      <p className="text-danger">
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
                    )} */}
                </div>
              </div>
              {/* <label className="block mb-2 text-sm text-gray-400">Otp</label> */}
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-300"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-300"
                  >
                    <small>Create new account</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      }

    </>
  )
}
