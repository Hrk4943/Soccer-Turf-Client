// import React,{useState} from 'react'
import UserList from '../../../Components/Admin/UserList/UserList'
import Header from '../../../Components/Admin/AdminHeader/Header'
import Sidebar from '../../../Components/Admin/AdminSidebar/Sidebar'


export default function UserManage() {
    // const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <Header  />
            {/* <div className="flex flex-row " style={{ minHeight: '100vh' }}>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
                <UserList />
            {/* </div> */}
        </>
    )
}
