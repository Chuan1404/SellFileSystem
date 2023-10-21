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
import { Authenticated, Title } from "./components";

export default function Routers() {
  return (
    <Routes>
      <Route index element={<Title title="Trang chủ" ><Home /></Title>} />
      <Route path="/file/detail/:id" element={<Title title="Chi tiết"><FileDetail /></Title>} />
      <Route path="/cart" element={<Title title="Giỏ hàng"><Authenticated><Cart /></Authenticated></Title>} />

      {/* payment */}
      <Route path="/payment" element={<Title title="Thanh toán"><Authenticated><Payment /></Authenticated></Title>} />
      <Route path="/payment/result" element={<Title title="Kết quả thanh toán"><PaymentResult /></Title>} />

      {/* user */}
      <Route path="/user/info" element={<Title title="Thông tin tài khoản"><Authenticated><UserInfo /></Authenticated></Title>} />
      <Route path="/user/receipt" element={<Title title="Hóa đơn"><Authenticated><UserReceipt /></Authenticated></Title>} />
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
