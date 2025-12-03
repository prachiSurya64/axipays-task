import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function MerchantModal({ merchant, isOpen, onClose, onSave }) {
  const [local, setLocal] = useState(merchant);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (merchant) setLocal(merchant);
  }, [merchant]);

  const onChange = (key, val) => {
    setLocal({ ...local, [key]: val });
  };

  const hasChargebackWarning =
    local?.chargebackRatio > 2 && local?.status === "active";

  const needsConfirmation =
    local?.status === "active" &&
    local?.riskLevel === "high" &&
    merchant?.status !== "active";

  const save = () => {
    if (needsConfirmation) return setConfirmOpen(true);
    onSave(local);
    onClose();
  };

  const confirmThenSave = () => {
    setConfirmOpen(false);
    onSave(local);
    onClose();
  };

  if (!local) return null;


  const statFields = [
    {
      label: "Monthly Volume",
      value: `$${local.monthlyVolume?.toLocaleString()}`,
    },
    {
      label: "Chargeback Ratio",
      value: `${local.chargebackRatio}%`,
    },
    {
      label: "Success Rate",
      value: `${local.successRate}%`,
    },
  ];

  const editableFields = [
    {
      key: "status",
      label: "Status",
      options: ["active", "paused", "blocked"],
    },
    {
      key: "riskLevel",
      label: "Risk Level",
      options: ["low", "medium", "high"],
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-40">
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg w-full max-w-2xl p-6 z-50 shadow-lg max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Merchant Details
            </DialogTitle>

            {hasChargebackWarning && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <span className="text-red-600 font-bold">⚠</span>
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    High Chargeback Alert
                  </p>
                  <p className="text-xs text-red-700">
                    Chargeback ratio ({local.chargebackRatio}%) exceeds 2% for
                    active merchant.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Merchant Name", value: local.name },
                  { label: "Country", value: local.country },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="text-xs font-medium text-gray-600 uppercase">
                      {item.label}
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statFields.map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 uppercase">
                      {stat.label}
                    </label>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Edit Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editableFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <select
                        value={local[field.key]}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                onClick={save}
              >
                Save Changes
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
            <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Confirm High-Risk Activation
            </DialogTitle>

            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p>
                You are attempting to set a <strong>HIGH RISK</strong> merchant
                to <strong>ACTIVE</strong> status.
              </p>
              <p className="text-red-700 font-medium">
                This may expose your platform to increased chargebacks and fraud
                risk.
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-3 border-t pt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                onClick={confirmThenSave}
              >
                Yes, Activate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
