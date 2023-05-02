import React,{useState} from 'react'
import Sidebar from '../../../Components/Admin/AdminSidebar/Sidebar'
import Header from '../../../Components/Admin/AdminHeader/Header'
import Booking from '../../../Components/Admin/Booking/Booking'

export default function SalesReport() {
    const [sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <>
      <Header />
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <Booking/>
    </>
  )
}
