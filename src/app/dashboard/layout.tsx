"use client"
import React, { ReactNode, useState } from "react";
import SideBar from "../sidebar";


const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex w-full bg-gray-50 h-screen">
    <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div  className={`flex flex-col w-full h-full transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        } p-8`}>
        {children}
        </div>
    </div>
  );  
};

export default DashboardLayout;
  