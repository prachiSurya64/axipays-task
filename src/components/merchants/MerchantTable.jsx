import React from "react";
import MerchantRow from "./MerchantRow";

export default function MerchantTable({ list, onRowClick }) {
  if (!list.length)
    return (
      <div className="mt-8 bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500 text-sm md:text-base">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 008.586 13H6"
            />
          </svg>
          No merchants found. Try adjusting your filters or search terms.
        </div>
      </div>
    );

  const tableHeaders = [
    { label: "Name", align: "text-left" },
    { label: "Country", align: "text-left" },
    { label: "Status", align: "text-center" },
    { label: "Monthly Volume", align: "text-right" },
    { label: "Chargeback %", align: "text-right" },
    { label: "Risk", align: "text-center" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {tableHeaders.map((h) => (
                <th
                  key={h.label}
                  className={`p-3 font-semibold text-gray-900 ${h.align}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {list.map((m) => (
              <MerchantRow key={m.id} m={m} onClick={() => onRowClick(m)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
