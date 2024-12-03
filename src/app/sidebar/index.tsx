"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { menuItems } from "./menuItems";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={`fixed top-0 left-0 h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-white shadow-lg z-10 p-5 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex justify-between">
          {!collapsed && (
            <Image
              className="pb-5"
              alt="Logo"
              src="/logo.png"
              width={138}
              height={17}
            />
          )}

          <MdKeyboardDoubleArrowLeft
            className={`cursor-pointer transition-transform duration-300 ${
              collapsed ? "rotate-180 ml-4" : ""
            }`}
            size={26}
            onClick={toggleSidebar}
          />
        </div>
        {menuItems.length > 0 ? (
          <>
            {menuItems.map((item, index) => {
              const active = isActive(item.path || "");
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 cursor-pointer rounded-lg p-2 ${
                    active
                      ? "bg-blue-700 bg-opacity-10"
                      : "hover:bg-blue-700 hover:bg-opacity-10"
                  }`}
                  onClick={() => item.path && router.push(item.path)}
                >
                  <span
                    className={`text-2xl ${
                      active ? "text-blue-700" : " text-black text-opacity-70"
                    }`}
                  >
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <p
                      className={`text-sm leading-4 ${
                        active ? "text-blue-700" : "text-black text-opacity-70"
                      }`}
                    >
                      {item.name}
                    </p>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          "No Menu Items available"
        )}
      </div>
    </div>
  );
};

export default SideBar;
