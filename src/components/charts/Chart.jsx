import React from "react";
import { groupBy } from "../../utils/calc";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({ data }) {
  const byCountry = groupBy(data, "country");
  const chartData = Object.entries(byCountry).map(([country, volume]) => ({
    name: country,
    volume,
  }));

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm md:text-base font-semibold text-gray-900">Volume by Country</h3>
      <div className="mt-4 w-full h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="volume" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Monthly Volume" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex justify-between text-sm text-gray-600">
            <span>{item.name}</span>
            <span className="font-semibold text-gray-900">${item.volume.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

