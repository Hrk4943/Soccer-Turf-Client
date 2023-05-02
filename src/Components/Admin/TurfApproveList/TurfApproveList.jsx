import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { adminUrl } from '../../../API/API'


export default function TurfApproveList() {
  const [turfOwner, setTurfOwner] = useState([])
  const [refresh, setRefresh] = useState(false)
  const Navigate = useNavigate()
  let token = localStorage.getItem('adminToken')
  useEffect(() => {
    token = localStorage.getItem('adminToken')
    const headers = { authorization: token }
    axios.get(`${adminUrl}newRequestTurf`, { headers }).then((response) => {
      setTurfOwner(response.data)
    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
    })
  }, [refresh])

  const approveTurf = (turfOwnerId) => {
    // console.log(turfOwnerId)
    const headers = { authorization: token }
    axios.post(`${adminUrl}approveTurfRequest/${turfOwnerId}`, { headers }).then((response) => {
      response.status === 200 && setRefresh(refresh => !refresh)

    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
    })
  }

  const rejectTurf = (turfOwnerId) => {
    const headers = { authorization: token }
    axios.post(`${adminUrl}rejectTurf`, { turfOwnerId }, { headers }).then((response) => {
      response.status === 200 && setRefresh(refresh => !refresh)
    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
    })
  }


  return (
    <>
      <Toaster />
      <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
        <h2 className="font-bold text-lg uppercase px-6 py-4">
          All New Turf Request
        </h2>
        <div className="overflow-x-auto" >
          <table className="table-auto min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase">No</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Turf Name</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Email</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Phone</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Opening Time</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Closing Time</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Price</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Reject</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {turfOwner && turfOwner.map((turf, index) => (
                <tr key={turf._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf.courtName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {console.log(turf)}
                    {turf.openingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* {console.log(turf.closingTime)} */}
                    {turf.closingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {turf ?.verification === 'Pending'  ?
                      <button 
                      type='button'
                      onClick={() => { approveTurf(turf._id) }}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Approve
                        </button>
                      : 
                      <button 
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      {turf.verification}
                      </button>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {turf ?.verification === 'Rejected'  ?
                      <button 
                      type='button'
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                       {turf.verification}
                        </button>
                      : 
                      <button 
                      onClick={() => { rejectTurf(turf._id) }}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                       Reject
                      </button>
                    }
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
