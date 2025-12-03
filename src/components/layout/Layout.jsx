import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HeadNav from "./HeadNav";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const layoutBlocks = [
    {
      show: sidebarOpen,
      key: "mobile-overlay",
      jsx: (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ),
    },
    {
      show: true,
      key: "sidebar",
      jsx: (
        <div
          className={`fixed md:static inset-y-0 left-0 z-40 transform transition-transform md:transform-none ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {layoutBlocks
        .filter((b) => b.show)
        .map((b) => <div key={b.key}>{b.jsx}</div>)}

      <div className="flex-1 flex flex-col">
        <HeadNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
