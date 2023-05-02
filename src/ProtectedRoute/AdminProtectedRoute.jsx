import React from 'react'
import { Navigate } from 'react-router-dom'


export default function AdminProtectedRoute(props) {
    if(localStorage.getItem('adminToken')){
        console.log('Admin is Logged')
        return props.children
    } else {
        console.log("Admin Not Logged")
        return <Navigate to={'/admin'} />
    }

}
