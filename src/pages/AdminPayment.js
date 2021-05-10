import React from "react";
import AdminPaymentBody from "../components/Admin/AdminPaymentBody";
import HeaderAdminPayment from "../components/Admin/HeaderAdminPayment";
import Footer from "../components/layouts/Footer";

function AdminPayment() {
  return (
    <>
      <HeaderAdminPayment />
      <AdminPaymentBody />
      <Footer />
    </>
  );
}

export default AdminPayment;
