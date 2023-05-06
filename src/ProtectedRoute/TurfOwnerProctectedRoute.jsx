import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import {AxiosTurfOwner} from '../API/AxiosInstance'
// import { turfOwnerUrl } from '../API/API.js'
// import axios from 'axios'

export default function TurfOwnerProtectedRoutes() {
    const Navigate=useNavigate()
    const [turfOwnerCheck,setTurfOwnerCheck]=useState(false)
    useEffect(()=>{
        const token =localStorage.getItem('turfToken')
        const headers={Authorization :token}
        AxiosTurfOwner.get(`authenticate`,{headers}).then((response)=>{
            setTurfOwnerCheck(response.data.authorization)
            // if(response.status!=200){
            //     setTurfOwnerCheck(false)
            //     Navigate('/login')
            // }else{
            //     setTurfOwnerCheck(true)
            // }
        }).catch(()=>{
            setTurfOwnerCheck(false)
            Navigate('/login')
        })
    },[])
  return (
    turfOwnerCheck && <Outlet/>
  )
}
