import { createContext, useEffect, useState, React } from "react";
import axios from "../config/axios";
export const OrderPaymentContext = createContext();

function OrderPaymentContextProvider({ children }) {
  const [payment, setPayment] = useState([]);
  const getPayment = async () => {
    const res = await axios.get("/admin/get-allpayment");
    setPayment(res.data.orders);
  };
  useEffect(() => {
    getPayment();
  }, []);
  return (
    <OrderPaymentContext.Provider
      value={{ payment, setPayment, getPayment }}>
      {children}
    </OrderPaymentContext.Provider>
  );
}

export default OrderPaymentContextProvider;
