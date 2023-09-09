import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, FileDetail, Payment, Cart, PaymentResult } from "./routes";

export default function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/file/detail/:id" element={<FileDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/result" element={<PaymentResult />} />

    </Routes>
  );
}
