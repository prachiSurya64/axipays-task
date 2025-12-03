import React from "react";

export default function Skeleton({ rows = 3, columns = 1, className = "" }) {
  const items = Array.from({ length: rows });
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((_, i) => (
        <div key={i} className="animate-pulse flex gap-3 items-center">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
