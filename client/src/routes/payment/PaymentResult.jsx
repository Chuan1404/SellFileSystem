import {
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Receipt from "../../components/Receipt";
import useQuery from "../../hooks/useQuery";
import paymentService from "../../services/paymentService";
import { useDispatch } from "react-redux";
import { clear } from "../../store/slices/cartSlice";

const PaymentResult = () => {
  const { search } = useLocation();
  const { data, fetching } = useQuery(
    () => paymentService.check("momo", search),
    [search]
  );
  const dispatch = useDispatch()
  if(!fetching && !data.message) {
    dispatch(clear({userId: data.user.id}))
  }
  console.log(data)
  return (
    <main id="payment_result_page">
      <Container sx={{ pt: 7 }}>
        {!fetching ? (
          data.message ? (
            <Typography variant="h2">{data.resultCode == 0 ? 'Đơn hàng đã thanh toán':`Đơn hàng chưa được thanh toán do: ${data.message}`}</Typography>
          ) : (
            <Receipt data={data}/>
          )
        ) : (
          ""
        )}

        <Stack direction={"row"} mt={4} justifyContent={"center"}>
        <Button variant="contained">
            <Link to={"/user/paid"}>Tới trang tải sản phẩm</Link>
          </Button>
          <Button variant="outlined">
            <Link to={"/"}>Trở về trang chủ</Link>
          </Button>
        </Stack>
      </Container>
    </main>
  );
};

export default PaymentResult;
