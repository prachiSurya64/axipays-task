import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ChargebackChart({ data }) {
  const chartData = data.map((m) => ({
    name: m.name,
    chargebackRatio: m.chargebackRatio,
    monthlyVolume: m.monthlyVolume,
    status: m.status,
    riskLevel: m.riskLevel,
  }));

  const riskLegends = [
    { label: "Low Risk", color: "bg-green-500" },
    { label: "Medium Risk", color: "bg-amber-500" },
    { label: "High Risk", color: "bg-red-500" },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm md:text-base font-semibold text-gray-900">
        Chargeback Distribution
      </h3>

      <div className="mt-4 w-full h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              type="number"
              dataKey="chargebackRatio"
              name="Chargeback Ratio (%)"
              stroke="#6b7280"
            />

            <YAxis
              type="number"
              dataKey="monthlyVolume"
              name="Monthly Volume"
              stroke="#6b7280"
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
              formatter={(value, name) => {
                if (name === "Monthly Volume")
                  return `$${value.toLocaleString()}`;
                if (name === "Chargeback Ratio (%)") return `${value}%`;
                return value;
              }}
              labelFormatter={(label) => `${label}%`}
            />

            <Scatter
              name="Merchants"
              data={chartData}
              fill="#4f46e5"
              shape="circle"
              isAnimationActive={true}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {riskLegends.map((item) => (
          <div className="flex items-center gap-2" key={item.label}>
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
