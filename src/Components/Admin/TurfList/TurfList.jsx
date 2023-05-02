import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adminUrl } from '../../../API/API'
import {toast,Toaster} from 'react-hot-toast'
import './TurfList.css'

export default function TurfList() {
    const [turfOwner,setTurfOwner]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [viewImage,setViewImage] = useState(false)
    const [preImage,setPreImage] = useState('')
    const Navigate=useNavigate()
    let token = localStorage.getItem('adminToken')
    
    useEffect(()=>{
        token =localStorage.getItem('adminToken')
        const headers = {authorization:token}
        axios.get(`${adminUrl}getTurfOwner`,{headers}).then((response)=>{
            setTurfOwner(response.data)
        }).catch((err)=>{
            err?.response?.status=== 401 ? Navigate('/admin') : toast.error('An error occured')
        })
    },[refresh])

    const blockTurfOwner=(turfOwnerId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}blockTurfOwner/${turfOwnerId}`,{headers}).then((response)=>{
            response.status === 200
            refresh ? setRefresh(false) : setRefresh(true)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
        })
    }

    const unblockTurfOwner=(turfOwnerId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}unblockTurfOwner/${turfOwnerId}`,{headers}).then((response)=>{
            response.status === 200
            refresh ? setRefresh(false) : setRefresh(true)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('An Error Occured')
        })
    }

  return (
    <>
      <Toaster />
      <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
        <h2 className="font-bold text-lg uppercase px-6 py-4">
          All Turf Owners
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
                <th className="px-6 py-4 text-left font-semibold uppercase">Closing Time</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Place</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">District</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Image</th>
                <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {turfOwner && turfOwner.map((owner, index) => (
                <tr key={owner._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.courtName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.openingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.closingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                    src={owner.images}
                    onClick={()=>{setViewImage(true);setPreImage(owner.images)}}
                     /> 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.block === false ?
                      <button onClick={() => { blockTurfOwner(owner._id) }} className="bg-red-600 border-red-600 border-2 w-20  rounded-lg text-slate-200 hover:bg-red-500 hover:border-red-500 transition">Block</button>
                      : <button onClick={() => { unblockTurfOwner(owner._id) }} className="bg-green-600 border-green-600 border-2 w-20  rounded-lg text-slate-200 hover:bg-green-500 hover:border-green-500 transition">Unblock</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {viewImage && (
             <div className="modal" onClick={() => setViewImage(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={preImage} alt='ID Proof' className="modal-image" />
            </div>
             </div>
          )}
        </div>
      </div>
    </>
  )
}
