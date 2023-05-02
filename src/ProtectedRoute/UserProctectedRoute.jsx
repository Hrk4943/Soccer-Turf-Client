import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import { userUrl } from '../API/API.js'
import axios from 'axios'

export default function UserProtectedRoutes() {
    const Navigate=useNavigate()
    const [userCheck,setUserCheck]=useState(false)
    useEffect(()=>{
        const token =localStorage.getItem('userToken')
        const headers={Authorization :token}
        axios.get(`${userUrl}authenticate`,{headers}).then((response)=>{
            if(response.status!=200){
                setUserCheck(false)
                Navigate('/login')
            }else{
                setUserCheck(true)
            }
        }).catch(()=>{
            setUserCheck(false)
            Navigate('/login')
        })
    },[])
  return (
    userCheck && <Outlet/>
  )
}
