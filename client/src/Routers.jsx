import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, FileDetail, Payment, Cart, PaymentResult, UserReceipt, UserInfo, UserPaid } from "./routes";

export default function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/file/detail/:id" element={<FileDetail />} />
      <Route path="/cart" element={<Cart />} />

      {/* payment */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/result" element={<PaymentResult />} />

      {/* user */}
      <Route path="/user/info" element={<UserInfo />} />
      <Route path="/user/receipt" element={<UserReceipt />} />
      <Route path="/user/paid" element={<UserPaid />} />
    </Routes>
  );
}
