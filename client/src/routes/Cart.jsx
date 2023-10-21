import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FileInCart } from "../components";
import { deleteFile } from "../store/slices/cartSlice";
import { closeAuth, openAuth } from "../store/slices/pageSlice";

const Cart = () => {
  const { isLogin, user } = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart.values[user.id]);
  const dispatch = useDispatch();

  const handleDelete = (file) => {
    dispatch(deleteFile({ userId: user.id, fileId: file.id }));
  };

  useEffect(() => {
    if (!isLogin) {
      dispatch(openAuth());
    } else {
      dispatch(closeAuth());
    }
  }, [isLogin]);
  return (
    <main id="cart_page">
      <Container sx={{ pt: 7 }}>
        <Typography variant={"h6"} marginBottom={2}>{`Giỏ hàng của bạn: (${
          cart?.length || 0
        })`}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {cart?.length > 0 &&
              cart?.map((item) => (
                <FileInCart
                  key={item.id}
                  file={item}
                  handleDelete={() => handleDelete(item)}
                />
              ))}
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginBottom={2}
              >
                <Typography variant="h6">Tổng thanh toán:</Typography>
                <Typography variant="h6">
                  {cart?.length > 0 &&
                    cart
                      ?.reduce((a, b) => a + b.price, 0)
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                </Typography>
              </Stack>
              <Link to={"/payment"}>
                <Button variant="contained" fullWidth sx={{ marginBottom: 1 }}>
                  Tiếp tục thanh toán
                </Button>
              </Link>

              <Link to={"/"}>
                <Typography textAlign={"center"} color={"blue"}>
                  Tiếp tục mua sắm
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Cart;
