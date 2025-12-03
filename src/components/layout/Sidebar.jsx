import React from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg transition font-medium ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar({ onClose }) {
 
  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/merchants", label: "Merchants" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen md:h-auto">

      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-indigo-600">Menu</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100"
          aria-label="close-sidebar"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 md:p-4 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} onClick={onClose}>
            {item.label}
          </NavItem>
        ))}
      </nav>

    </aside>
  );
}
