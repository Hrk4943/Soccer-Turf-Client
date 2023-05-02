import React from 'react'
import Video from '../../../assets/Video.mp4'
import Nav from '../Layout/Nav'
import { useNavigate } from 'react-router-dom'


function Home() {
  const Navigate=useNavigate()
  return (
    <>
    <Nav/>
    <div className="relative">
      <video className="w-full h-auto object-cover" autoPlay muted loop>
        <source src={Video} type="video/mp4" />
      </video>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-white text-4xl font-bold">Let's Start The Game</h1>
        <div className="mt-8">
          <button className="bg-white text-gray-900 px-6 py-3 mr-4 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={()=>Navigate('/turfs')}
          >
            Book Venue
            {}
          </button>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={()=>Navigate('/turf-register')}
          >
            Join The Team
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home