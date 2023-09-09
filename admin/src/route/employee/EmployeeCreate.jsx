import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Authenticated, Form } from "../../components";

const EmployeeCreate = () => {
  const { register, handleSubmit } = useForm();
  const formItems = [
    { type: "text", label: "User name", ...register("name") },
    { type: "text", label: "Email", ...register("email") },
    { type: "password", label: "Password", ...register("password") },
    { type: "password", label: "Confirm password", ...register("confirm") },
    { type: "boolean", label: "Active", ...register("isActive") },
    { type: "file", label: "File", ...register("file") },
  ];

  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <Authenticated>
      <main id="employee_create_page">
        <Box>
          <Typography variant="h3">Add employee</Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Form formItems={formItems} onSubmit={handleSubmit(formSubmit)} />
      </main>
    </Authenticated>
  );
};

export default EmployeeCreate;
