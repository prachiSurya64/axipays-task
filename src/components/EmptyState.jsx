import React from "react";

export default function EmptyState({ title = "No data", sub = "", icon = "📭" }) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-lg md:text-xl font-semibold text-gray-900">{title}</div>
      {sub && <div className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">{sub}</div>}
    </div>
  );
}
