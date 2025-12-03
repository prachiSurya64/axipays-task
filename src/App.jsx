
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Merchants from "./pages/Merchants";
import merchantsData from "./data/merchants.json";
import { MerchantsContext } from "./utils/merchantsContext";

export default function App() {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
  const saved = localStorage.getItem("merchants");
  if (saved) {
    setMerchants(JSON.parse(saved));
  } else {
    setMerchants(merchantsData);
  }
}, []);

 useEffect(() => {
  if (merchants.length > 0) {
    localStorage.setItem("merchants", JSON.stringify(merchants));
  }
}, [merchants]);


  const updateMerchant = (updated) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };
  const addMerchant = (m) => setMerchants((prev) => [m, ...prev]);

  return (
    <MerchantsContext.Provider
      value={{ merchants, updateMerchant, addMerchant }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/merchants" element={<Merchants />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MerchantsContext.Provider>
  );
}

