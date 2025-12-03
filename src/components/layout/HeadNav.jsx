import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function HeadNav({ onMenuClick }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const themeIcons = {
    dark: <SunIcon className="h-5 w-5 text-yellow-300" />,
    light: <MoonIcon className="h-5 w-5 text-gray-600" />,
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="toggle-menu"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="text-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-300">
          Merchant Ops Dashboard
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="toggle-theme"
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          {themeIcons[theme]}
        </button>
      </div>
    </header>
  );
}
