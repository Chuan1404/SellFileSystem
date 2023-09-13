import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import paymentService from "../../services/paymentService";

export default function Payment() {
  const { user } = useSelector((store) => store.auth);
  const carts = useSelector((store) => store.cart.values);

  const [value, setValue] = useState("momo");
  const handlePay = async () => {
    let data = {
      amount: carts[user.id].reduce((a, b) => a + b.price, 0),
      lang: "vi",
      extraData: JSON.stringify({
        idList: carts[user.id].map((file) => file.id),
        userId: user.id,
      }),
    };
    let response = await paymentService.pay(value, data);
    if (response.resultCode === 0) {
      window.location.href = response.payUrl;
    } else {
      alert(response.message);
    }
  };
 
  return (
    <main id="payment_page">
      <Container sx={{ pt: 7 }}>
        {carts[user.id]?.length? <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="momo"
                name="radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label={
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <img
                        width={60}
                        src={
                          "https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                        }
                      />
                      <Typography variant="body1">Thanh toán Momo</Typography>
                    </Stack>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h5">Đơn hàng</Typography>
              <Typography variant="body2">
                {carts[user.id].length} sản phẩm
              </Typography>

              <Divider />

              <Typography variant="h6" marginY={2}>
                Tổng:{" "}
                {carts[user.id]
                  ?.reduce((a, b) => a + b.price, 0)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </Typography>

              <Button variant="contained" onClick={() => handlePay()}>
                Thanh toán
              </Button>
            </Box>
          </Grid>
        </Grid>:
        <Typography variant="h1">Chưa có sản phẩm</Typography>
        }
        
      </Container>
    </main>
  );
}
