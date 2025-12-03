import React, { useContext, useMemo, useState } from "react";
import { applyFilters } from "../utils/filters";
import { MerchantsContext } from "../utils/merchantsContext";
import MerchantTable from "../components/merchants/MerchantTable";
import MerchantModal from "../components/merchants/MerchantModal";
import MerchantForm from "../components/merchants/MerchantForm";

export default function Merchants() {
  const { merchants, updateMerchant, addMerchant } = useContext(MerchantsContext);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortBy, setSortBy] = useState({ field: "monthlyVolume", dir: "desc" });
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filterOptions = {
    status: [
      { value: "all", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
      { value: "blocked", label: "Blocked" },
    ],
    risk: [
      { value: "all", label: "All Risk Levels" },
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
    sort: [
      { value: "monthlyVolume", label: "Sort by Volume" },
      { value: "chargebackRatio", label: "Sort by Chargeback" },
    ],
  };

  const list = useMemo(
    () =>
      applyFilters(merchants, {
        query,
        status: statusFilter,
        risk: riskFilter,
        sortBy,
      }),
    [merchants, query, statusFilter, riskFilter, sortBy]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Merchants</h1>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search merchants by name..."
              className="flex-1 form-input md:p-3"
            />

            <button
              onClick={() => setShowAdd(true)}
              className="px-4 py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer"
            >
              + Add Merchant
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap ">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              {filterOptions.status.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="form-input"
            >
              {filterOptions.risk.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy.field}
              onChange={(e) =>
                setSortBy((s) => ({ ...s, field: e.target.value }))
              }
              className="form-input"
            >
              {filterOptions.sort.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setSortBy((s) => ({
                  ...s,
                  dir: s.dir === "asc" ? "desc" : "asc",
                }))
              }
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              title={`Sort ${sortBy.dir === "asc" ? "descending" : "ascending"}`}
            >
              {sortBy.dir === "asc" ? "↑" : "↓"}
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{list.length}</span> of{" "}
            <span className="font-semibold">{merchants.length}</span> merchants
          </div>
        </div>
      </div>

      <MerchantTable list={list} onRowClick={(m) => setSelected(m)} />

      <MerchantModal
        isOpen={!!selected}
        merchant={selected}
        onClose={() => setSelected(null)}
        onSave={(m) => updateMerchant(m)}
      />

      {showAdd && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setShowAdd(false)}
          ></div>

          <div className="bg-white rounded-lg w-full max-w-2xl z-50 m-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Add New Merchant
              </h3>
            </div>

            <div className="p-4 md:p-6">
              <MerchantForm
                initial={{
                  name: "",
                  country: "",
                  monthlyVolume: "",
                  chargebackRatio: 0,
                  status: "active",
                  riskLevel: "low",
                }}
                onCancel={() => setShowAdd(false)}
                onSubmit={(v) => {
                  addMerchant({
                    ...v,
                    id: "m" + Math.random().toString(36).slice(2, 8),
                    successRate: 98,
                  });
                  setShowAdd(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
