import React from "react";

const Status = ({ s }) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
    blocked: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[s] || "bg-gray-100"}`}>
      {s}
    </span>
  );
};

const RiskBadge = ({ level }) => {
  const colors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[level] || "bg-gray-100"}`}>
      {level}
    </span>
  );
};

export default function MerchantRow({ m, onClick }) {
  return (
    <tr onClick={onClick} className="cursor-pointer hover:bg-indigo-50 transition-colors border-b">
      <td className="p-3 text-sm font-medium text-gray-900">{m.name}</td>
      <td className="p-3 text-sm text-gray-600">{m.country}</td>
      <td className="p-3 text-center">
        <Status s={m.status} />
      </td>
      <td className="p-3 text-right text-sm font-semibold text-gray-900">${m.monthlyVolume.toLocaleString()}</td>
      <td className="p-3 text-right text-sm font-medium text-gray-700">{m.chargebackRatio}%</td>
      <td className="p-3 text-center">
        <RiskBadge level={m.riskLevel} />
      </td>
    </tr>
  );
}

