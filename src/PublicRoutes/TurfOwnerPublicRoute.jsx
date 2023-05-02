import React from 'react'
import { Navigate } from 'react-router-dom'

export default function TurfOwnerPublicRoute(props) {
    if(localStorage.getItem('turfToken')){
        return <Navigate to={'/turfOwner/home'} />
    } else {
        console.log('No Owner')
        return props.children
    }
}
