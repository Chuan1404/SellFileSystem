import { Laptop, PhoneAndroid, Tablet } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UserPaid = () => {
    const [device, setDevice] = useState("laptop")
    const handleDevice = (event, newDevice) => {
        if (newDevice != null) {
            setDevice(newDevice);
        }
      };
  return (
    <main id="user_paid_page">
      <Container sx={{ pt: 7 }}>
        <Paper elevation={3}>
          <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
            <Box width={400}>
              <img
                style={{ borderRadius: "10px" }}
                width={"100%"}
                src="https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1694354977565_1694354977495_IMG_4743.jpg"
              />
            </Box>

            <Stack width={"100%"}>
              <Typography variant="h5">Cô gái ngồi trên ghế</Typography>
              <ToggleButtonGroup
                value={device}
                exclusive
                onChange={handleDevice}
                aria-label="device"
                sx={{my: 2}}
              >
                <ToggleButton value="laptop" aria-label="laptop">
                  <Laptop />
                </ToggleButton>
                <ToggleButton value="tablet" aria-label="tablet">
                  <Tablet />
                </ToggleButton>
                <ToggleButton value="phone" aria-label="phone">
                  <PhoneAndroid />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant="contained"
                sx={{ marginTop: "auto", marginLeft: "auto" }}
              >
                Tải về
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
};

export default UserPaid;
