import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Navbar } from '../Navbar';
import  Sidebar  from '../Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        onMenuClick={toggleSidebar} 
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <main 
        className={cn(
          "transition-all duration-300 pt-16",
          isSidebarOpen ? "lg:pl-64" : "lg:pl-16"
        )}
      >
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;