import { Box, Typography } from "@mui/material";
import { Authenticated, Form } from "../components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <Authenticated>
      <Box>
        <Typography variant="h1">Dashboard</Typography>
        <Form />
      </Box>
    </Authenticated>
  );
}
