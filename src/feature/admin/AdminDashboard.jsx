import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div >
         <h1 className='text-center'>Admin Dashboard</h1>
         <Outlet></Outlet>
    </div>
  )
}

export default AdminDashboard
