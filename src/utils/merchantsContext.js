import { createContext } from "react";
export const MerchantsContext = createContext({
  merchants: [],
  updateMerchant: () => {},
  addMerchant: () => {},
});
