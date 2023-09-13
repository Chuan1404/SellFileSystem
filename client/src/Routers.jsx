import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  FileDetail,
  Payment,
  Cart,
  PaymentResult,
  UserReceipt,
  UserInfo,
  UserPaid,
} from "./routes";
import { Authenticated } from "./components";

export default function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/file/detail/:id" element={<FileDetail />} />
      <Route path="/cart" element={<Authenticated><Cart /></Authenticated>} />

      {/* payment */}
      <Route path="/payment" element={<Authenticated><Payment /></Authenticated>} />
      <Route path="/payment/result" element={<PaymentResult />} />

      {/* user */}
      <Route path="/user/info" element={<Authenticated><UserInfo /></Authenticated>} />
      <Route path="/user/receipt" element={<Authenticated><UserReceipt /></Authenticated>} />
      <Route
        path="/user/paid"
        element={
          <Authenticated>
            <UserPaid />
          </Authenticated>
        }
      />
    </Routes>
  );
}
