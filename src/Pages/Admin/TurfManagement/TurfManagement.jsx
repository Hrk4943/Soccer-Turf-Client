import React ,{useState} from 'react'
import TurfList from '../../../Components/Admin/TurfList/TurfList'
import Header from '../../../Components/Admin/AdminHeader/Header'
import Sidebar from '../../../Components/Admin/AdminSidebar/Sidebar'

export default function TurfManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <Header  />
            {/* <div className="flex flex-row " style={{ minHeight: '100vh' }}>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
                <TurfList />
            {/* </div> */}
        </>
    )
}
