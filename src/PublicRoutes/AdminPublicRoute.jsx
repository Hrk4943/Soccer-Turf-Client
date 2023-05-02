import React from 'react'
import {Navigate} from 'react-router-dom'

export default function AdminPublicRoute(props) {
  if(localStorage.getItem('adminToken')){
    return <Navigate to={'/admin/home'}/>
  }else{
    console.log("No admin")
    return props.children
  }
}
