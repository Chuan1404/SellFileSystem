import React from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import paymentService from "../../services/paymentService";
import { Container, Typography } from "@mui/material";

const PaymentResult = () => {
  const { search } = useLocation();
  const { data, fetching } = useQuery(
    () => paymentService.check("momo", search),
    [search]
  );

  console.log(data)

  return (
    <main id="payment_result_page">
      <Container sx={{ pt: 7 }}>
        <Typography variant="h1">{data.message || ''}</Typography>
      </Container>
    </main>
  );
};

export default PaymentResult;
