import React,{useState}  from 'react'
import TurfApproveList from '../../../Components/Admin/TurfApproveList/TurfApproveList'
import Header from '../../../Components/Admin/AdminHeader/Header'
import Sidebar from '../../../Components/Admin/AdminSidebar/Sidebar'

export default function TurfApproval() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <Header />
            {/* <div className="flex flex-row " style={{ minHeight: '100vh' }}> */}
                {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
                <TurfApproveList />
            {/* </div> */}
        </>
    )
}
