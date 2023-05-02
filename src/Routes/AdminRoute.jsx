import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AdminLogin from '../Components/Admin/Login/Login'
import AdminHome from '../Pages/Admin/Home/Home'
import AdminProtectedRoute from '../ProtectedRoute/AdminProtectedRoute'
import AdminPublicRoute from '../PublicRoutes/AdminPublicRoute'
import UserManagement from '../Pages/Admin/UserManagement/UserManage'
import TurfApproval from '../Pages/Admin/TurfApproval/TurfApproval'
import TurfManagement from '../Pages/Admin/TurfManagement/TurfManagement'
import SalesReport from '../Pages/Admin/SalesReport/SalesReport'

export default function AdminRoute() {
  return (
    <>
    <Routes>
        <Route path='/' element={<AdminPublicRoute><AdminLogin/></AdminPublicRoute>} />
        <Route path='/home' element={<AdminProtectedRoute><AdminHome/></AdminProtectedRoute>} />
        <Route path='/userManagement' element={<AdminProtectedRoute><UserManagement/></AdminProtectedRoute>} />
        <Route path='/booking' element={<AdminProtectedRoute><SalesReport/></AdminProtectedRoute>} />
        <Route path='/turfRequest' element={<AdminProtectedRoute><TurfApproval/></AdminProtectedRoute>} />
        <Route path='/turfManagement'element={<AdminProtectedRoute><TurfManagement/></AdminProtectedRoute>}  />
    </Routes>
    </>
  )
}
