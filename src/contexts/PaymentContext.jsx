import { createContext, useContext, useState } from "react";

const PaymentContext = createContext(null);
export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  // idle | processing | success

  const makePayment = () => {
    setStatus("processing");

    return new Promise((resolve) => {
      setTimeout(() => {
        setStatus("success");
        resolve("PAYMENT_SUCCESS");
      }, 2000); // fake gateway delay
    });
  };

  const resetPayment = () => setStatus("idle");

  return (
    <PaymentContext.Provider
      value={{
        status,
        makePayment,
        resetPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
