import React from "react";
export default function StatCard({ title, value, sub, highlight }) {
  return (
    <div className={`stat-card ${highlight ? "stat-card--alert" : ""}`}>
      <div className={`text-xs md:text-sm font-medium ${highlight ? "text-red-600" : "text-gray-500"}`}>
        {title}
      </div>
      <div className={`mt-2 text-xl md:text-3xl font-bold ${highlight ? "text-red-700" : "text-gray-900"}`}>
        {value}
      </div>
      {sub && <div className="text-xs md:text-sm text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

