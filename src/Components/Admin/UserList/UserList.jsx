import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
// import { adminUrl } from '../../../API/API'
// import axios from 'axios'
import { Axiosadmin } from '../../../API/AxiosInstance'
import { toast, Toaster } from 'react-hot-toast'
import 'animate.css'



function UserList() {
  const [users, setUsers] = useState([])
  const [refresh,setRefresh] = useState(false)
  const Navigate = useNavigate()
  let token = localStorage.getItem('adminToken')

  useEffect(() => {
    token = localStorage.getItem('adminToken')
    const headers = { authorization: token }
    Axiosadmin.get(`getUsers`, { headers }).then((response) => {
      setUsers(response.data)
    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error("An Error Occured")
    })
  }, [refresh])

  const blockUser = (usersId) => {
    console.log(usersId)
    const headers = { authorization: token }
    Axiosadmin.patch(`blockUser/${usersId}`, { headers }).then((response) => {
      response.status === 200
      refresh ? setRefresh(false) : setRefresh(true)
    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
    })
  }


  const unblockUser = (usersId) => {
    const headers = { authorization: token }
    Axiosadmin.patch(`unblockUser/${usersId}`, { headers }).then((response) => {
      response.status === 200
      refresh ? setRefresh(false) : setRefresh(true)
    }).catch((err) => {
      err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
    })
  }


  return (
    <>
      <Toaster />
      <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
        <h2 className="font-bold text-lg uppercase px-6 py-4">
          All Users
        </h2>
        <div className="overflow-x-auto" >
          <table className="table-auto min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase">No</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Email</th>
                {/* <th className="px-6 py-4 text-center font-semibold uppercase">Phone</th> */}
                <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users && users.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {user.Phone}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.block === false ?
                      <button onClick={() => { blockUser(user._id) }} className="bg-red-600 border-red-600 border-2 w-20  rounded-lg text-slate-200 hover:bg-red-500 hover:border-red-500 transition">Block</button>
                      : <button onClick={() => { unblockUser(user._id) }} className="bg-green-600 border-green-600 border-2 w-20  rounded-lg text-slate-200 hover:bg-green-500 hover:border-green-500 transition">Unblock</button>
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

export default UserList