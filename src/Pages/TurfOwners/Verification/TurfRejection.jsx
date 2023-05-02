import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa"
export default function TurfRejection() {
  return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center space-y-6">
            <div className="text-5xl text-blue-500">
              <FaExclamationTriangle />
            </div>
            <h1 className="text-3xl font-bold text-center">
             Your Request is Rejected
            </h1>
            <p className="text-lg text-center">
              Thank you for submitting your profile! We are unfortunately sorry for the inconvience.
              We had rejected your request is because you haven't completed the registration.  
            </p>
            <p className="text-lg text-center">
              Complete the Registration with accurate details. 
            </p>
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => console.log("Resend Verification Email")}
            >
              Resend Verification Email
            </button> */}
          </div>
        </div>
  )
}
