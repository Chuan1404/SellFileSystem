import { Avatar, Divider, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Receipt = ({ data, ...res }) => {
  return (
    <Stack {...res}>
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Typography textAlign={"center"} marginBottom={2} variant="h4">
          Hóa đơn
        </Typography>
        <Typography
          variant="h6"
          marginBottom={1}
        >{`Ngày: ${data.createdDate[2]}-${data.createdDate[1]}-${data.createdDate[0]}`}</Typography>

        <Divider />

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Thời hạn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.files?.map((row) => (
              <TableRow key={row.id}>
                <TableCell scope="row">{row.id}</TableCell>
                <TableCell scope="row">{row.title}</TableCell>
                <TableCell scope="row">
                  {row.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell scope="row">12 tháng</TableCell>
                {/* <TableCell scope="row">
                  <Link>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Avatar src={row.user?.avatar} />
                      <Typography>{row.user?.name || "không xác định"}</Typography>
                    </Stack>
                  </Link>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack direction={"row"} justifyContent={"space-between"} marginTop={2}>
          <Typography variant="h6">Tổng cộng:</Typography>
          <Typography variant="h6">
            {data.totalPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Receipt;
