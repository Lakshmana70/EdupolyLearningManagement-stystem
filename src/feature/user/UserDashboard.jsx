import React from 'react'
import { Outlet } from 'react-router-dom'

function UserDashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <main className="col-12  ">
         {/* Main Content Area */}
          <div className="row g-0 ">
            <div className="col p-0  ">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard
