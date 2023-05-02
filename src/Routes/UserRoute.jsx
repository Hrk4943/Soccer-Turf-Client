import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import UserProctectedRoute from '../ProtectedRoute/UserProctectedRoute'
import UserPublicRoute from '../PublicRoutes/UserPublicRoute'
import Home from '../Components/User/HomePage/Home'
import SuccessPage from '../Components/User/TurfSinglePage/Components/Succes'
import Profile from '../Pages/User/Profile/Profile'
import BookingList from '../Pages/User/BookingList/BookingList'

function UserRoute() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/success/:id' element={<SuccessPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/viewbookings' element={<BookingList/>} />
    </Routes>
    </>
  )
}

export default UserRoute