import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function UserPublicRoute() {
    const userToken = localStorage.getItem('userToken')
    const turfToken = localStorage.getItem('turfToken')

    return(
       userToken && userToken ? <Navigate to="/"/> :  <Outlet/>,
       turfToken && turfToken ? <Navigate to='/turfOwner/dashBoard'/>:<Outlet/>
    )
}
