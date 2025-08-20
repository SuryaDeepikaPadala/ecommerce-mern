import AdminHeader from '@/components/Admin/AdminHeader';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on larger screens */}
      <div className="hidden sm:block w-[240px] p-4 border-r">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <AdminHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
