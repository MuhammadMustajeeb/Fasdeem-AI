"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  Home,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="sm:hidden p-4">
        <button
          onClick={() => setOpen(!open)}
          className="text-purple-700 font-medium flex items-center gap-2"
        >
          <Menu className="w-5 h-5" />
          Menu
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full transition-transform duration-300
          bg-white border-r border-gray-200 backdrop-blur-md
          ${open ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:static
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* Brand + Collapse Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-purple-600">Fasdeem</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden sm:flex p-1 rounded hover:bg-gray-100 transition"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-purple-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-2 mt-4">
          {navItems.map((item) => {
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
