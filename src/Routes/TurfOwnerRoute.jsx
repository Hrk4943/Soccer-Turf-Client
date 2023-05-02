import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import TurfHome from '../Pages/TurfOwners/Home/Home'
import TurfOwnerProctectedRoute from '../ProtectedRoute/TurfOwnerProctectedRoute'
import TurfOwnerPublicRoute from '../PublicRoutes/TurfOwnerPublicRoute'
import TurfRejection from '../Pages/TurfOwners/Verification/TurfRejection'
import TurfVerification from '../Pages/TurfOwners/Verification/TurfVerification'
import OwnerProfile from '../Pages/TurfOwners/Profile/OwnerProfile'
import DashBoard from '../Pages/TurfOwners/DashBoard/DashBoard'
import Bookings from '../Pages/TurfOwners/Bookings/Bookings'
import Report from '../Pages/TurfOwners/Report/Report'


export default function TurfOwnerRoute(){
    return(
        <>
        <Routes>
            <Route element={<TurfOwnerProctectedRoute/>}>
            {/* <Route path='/home' element={<TurfHome/>} /> */}
            <Route path='/dashBoard' element={<DashBoard/>}/>
            <Route path='/turf-profile' element={<OwnerProfile/>}/>
            <Route path='/turf-bookings' element={<Bookings/>}/>
            <Route path='/turf-reports' element={<Report/>}/>
            </Route>
            <Route path='/verification' element={<TurfOwnerPublicRoute><TurfVerification/></TurfOwnerPublicRoute>} />
            <Route path='/rejected' element={<TurfOwnerPublicRoute><TurfRejection/></TurfOwnerPublicRoute>} />
        </Routes>
        </>
    )
}