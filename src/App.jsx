import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/User/HomePage/Home'
import Login from './Components/Login/Login'
import SignUpPage from '../src/Pages//User/SignUp/SignUp'
import TurfRegistration from '../src/Pages/TurfOwners/Register/Register'
import Turfs from './Pages/User/Turf/Turfs'
import AdminRoute from './Routes/AdminRoute'
import TurfOwnerRoute from './Routes/TurfOwnerRoute'
import TurfDetails from './Pages/User/TurfDetails/TurfDetails'
import UserRoute from './Routes/UserRoute'
import UserPublicRoute from './PublicRoutes/UserPublicRoute'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<UserPublicRoute />}>
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route exact path='/' element={<Home />} />
          <Route path="/turf-register" element={<TurfRegistration />} />
          <Route path='/turfs' element={<Turfs />} />
          <Route path='/turfs-details' element={<TurfDetails />} />
          <Route path='/*' element={<UserRoute />} />
          <Route path='/turfOwner/*' element={<TurfOwnerRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
