import React, { useState, useEffect } from "react";

export default function MerchantForm({ initial, onSubmit, onCancel }) {
  const defaultMerchant = {
    name: "",
    country: "",
    monthlyVolume: "",
    chargebackRatio: 0,
    status: "active",
    riskLevel: "low",
  };

  const [values, setValues] = useState(initial || defaultMerchant);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const inputFields = [
    {
      key: "name",
      label: "Name *",
      placeholder: "Enter merchant name",
      type: "text",
      grid: "full",
    },
    {
      key: "country",
      label: "Country *",
      placeholder: "Enter country",
      type: "text",
      grid: "full",
    },
    {
      key: "monthlyVolume",
      label: "Monthly Volume *",
      placeholder: "0",
      type: "number",
      grid: "half",
    },
    {
      key: "chargebackRatio",
      label: "Chargeback Ratio (%)",
      placeholder: "0",
      type: "number",
      grid: "half",
    },
  ];

  const dropdowns = [
    {
      key: "status",
      label: "Status *",
      options: ["active", "paused", "blocked"],
    },
    {
      key: "riskLevel",
      label: "Risk Level *",
      options: ["low", "medium", "high"],
    },
  ];

  useEffect(() => {
    const e = {};

    if (!values.name || values.name.trim().length < 3)
      e.name = "Name required (min 3 characters)";
    if (!values.country) e.country = "Country required";
    if (!values.monthlyVolume || Number(values.monthlyVolume) <= 0)
      e.monthlyVolume = "Must be > 0";
    if (values.chargebackRatio < 0)
      e.chargebackRatio = "Must be >= 0";

    setErrors(e);
  }, [values]);

  const handle = (k, v) => {
    setValues((prev) => ({ ...prev, [k]: v }));
  };

  const submit = () => {
    if (Object.keys(errors).length === 0) {
      onSubmit({
        ...values,
        monthlyVolume: Number(values.monthlyVolume),
        name: values.name.trim(),
      });
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <div className="space-y-4">

        {inputFields.map((f) => (
          <div
            key={f.key}
            className={f.grid === "half"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : ""}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {f.label}
              </label>

              <input
                type={f.type}
                value={values[f.key]}
                placeholder={f.placeholder}
                onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                onChange={(e) =>
                  handle(
                    f.key,
                    f.type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
                className={`w-full form-input mt-1 ${
                  touched[f.key] && errors[f.key]
                    ? "border-red-500 focus:ring-red-200 rounded-md"
                    : "rounded-md"
                }`}
              />

              {touched[f.key] && errors[f.key] && (
                <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors[f.key]}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dropdowns.map((d) => (
            <div key={d.key}>
              <label className="block text-sm font-medium text-gray-700">
                {d.label}
              </label>
              <select
                value={values[d.key]}
                onChange={(e) => handle(d.key, e.target.value)}
                className="w-full form-input rounded-md mt-1 p-2 text-sm"
              >
                {d.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            disabled={Object.keys(errors).length > 0}
            onClick={submit}
            className={`px-4 py-2 rounded-md font-medium text-white transition ${
              Object.keys(errors).length > 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
