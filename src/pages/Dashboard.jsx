import React, { useContext } from "react";
import { MerchantsContext } from "../utils/merchantsContext";
import StatCard from "../components/StatCard";
import Chart from "../components/charts/Chart";
import ChargebackChart from "../components/charts/ChargebackChart";
import {
  totalVolume,
  avgSuccessRate,
  countByStatus,
  countByRisk,
} from "../utils/calc";
import Skeleton from "../common/Skeleton";

export default function Dashboard() {
  const { merchants } = useContext(MerchantsContext);

  if (!merchants.length)
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} rows={1} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 h-72">
              <Skeleton rows={6} />
            </div>
          ))}
        </div>
      </div>
    );

  const total = totalVolume(merchants);
  const avg = avgSuccessRate(merchants);
  const activeCount = countByStatus(merchants, "active");
  const highRiskCount = countByRisk(merchants, "high");

  const statItems = [
    {
      title: "Total Monthly Volume",
      value: `$${total.toLocaleString()}`,
      sub: "All merchants combined",
    },
    {
      title: "Avg Success Rate",
      value: `${avg}%`,
      sub: "Payment success rate",
    },
    {
      title: "Active Merchants",
      value: activeCount,
      sub: `${merchants.length} total merchants`,
    },
    {
      title: "High Risk Merchants",
      value: highRiskCount,
      sub: "Requires attention",
      highlight: highRiskCount > 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              sub={item.sub}
              highlight={item.highlight}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart data={merchants} />
        <ChargebackChart data={merchants} />
      </div>
    </div>
  );
}
