"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Home, LayoutDashboard, ChevronLeft, ChevronRight, LogOut, Settings, User } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false); // Mobile drawer
  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* 📱 Mobile Menu Button */}
      <div className="sm:hidden p-4 flex justify-between items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-500 transition"
        >
          <Menu className="w-5 h-5" />
          Menu
        </button>

        {/* 🧑 Avatar (Mobile) */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)}>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-gray-300 hover:ring-2 hover:ring-indigo-400"
            />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                <User className="w-4 h-4 text-gray-500" /> Profile
              </Link>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                <Settings className="w-4 h-4 text-gray-500" /> Settings
              </Link>
              <button className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-red-500">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🌈 Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out
          bg-white border-r border-gray-200 shadow-md
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* 🚀 Brand Header + Profile */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          {!collapsed && (
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
              Fasdeem
            </h2>
          )}

          <div className="flex items-center gap-2">
            {/* Collapse Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden sm:flex p-1 rounded-lg hover:bg-gray-100 transition"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 text-indigo-500" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-indigo-500" />
              )}
            </button>

            {/* Profile Avatar */}
            <div className="relative hidden sm:block">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border border-gray-300 hover:ring-2 hover:ring-indigo-400"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                    <User className="w-4 h-4 text-gray-500" /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm">
                    <Settings className="w-4 h-4 text-gray-500" /> Settings
                  </Link>
                  <button className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-red-500">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🧭 Nav Links */}
        <nav className="flex flex-col gap-1 px-2 mt-4">
          {navItems.map((item) => {
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <span className={`transition ${isActive ? "text-purple-500" : ""}`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 📱 Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
