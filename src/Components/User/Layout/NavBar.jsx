import React, { useState } from 'react'
import Logo from '../../assets/logo.png'

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const Image = () => (
    <img className='w-[70px] mx-2' src={Logo} />
  )
  return (
    <div>
      <nav class="bg-green-800 px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 h-20">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">

              <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white'>

                <Image />
                SoccerTurF
              </div>

              <div className="md:hidden">

                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-slate-200 hover:text-blue-600">
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li className="text-slate-200 hover:text-blue-600">
                  <a href="javascript:void(0)">Blog</a>
                </li>
                <li className="text-slate-200 hover:text-blue-600">
                  <a href="javascript:void(0)">About US</a>
                </li>
                <li className="text-slate-200 hover:text-blue-600">
                  <a href="javascript:void(0)">Contact US</a>
                </li>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar