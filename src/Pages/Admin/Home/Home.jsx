import React,{useState} from 'react'
import Sidebar from '../../../Components/Admin/AdminSidebar/Sidebar'
import Header from '../../../Components/Admin/AdminHeader/Header'
import Dashboard from '../../../Components/Admin/Dashboard/Dashboard'

export default function Home() {
  const [sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <div>
      <Header />
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <Dashboard/>
    </div>
  )
}
