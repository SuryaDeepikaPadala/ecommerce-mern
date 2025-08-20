import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Half (Welcome Section) */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Suppes</h2>
          
        </div>
      </div>

      {/* Right Half (Form Section) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
