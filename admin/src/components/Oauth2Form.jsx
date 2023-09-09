import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import facebookLogo from "../assets/images/facebook.png";
import googleLogo from "../assets/images/google.png";
import { authService } from "../services";
import { signIn } from "../store/slices/authSlice";
const Oauth2Form = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialForms.field,
  });

  // ---------- on form submit ----------
  const onSubmit = async (form) => {
    const response = await authService.signIn(form);
    if(!response.error) {
      dispatch(signIn(response))
      dispatch({type: "FETCH_INFO"})
    }
    else {
      setError('email', { message: response.error });
    }
  };
  return (
    <Box sx={{ maxWidth: 400 }} bgcolor={"#fff"} p={4}>
      <Typography variant="h5" textAlign={"center"}>
        Chào mừng đến với website của chúng tôi
      </Typography>
      <Divider />
      <Stack
        direction={"row"}
        alignItems={"baseline"}
        justifyContent={"center"}
        spacing={2}
      >
        <IconButton>
          <img width={36} src={googleLogo} />
        </IconButton>
        <IconButton>
          <img width={36} src={facebookLogo} />
        </IconButton>
      </Stack>
      <Divider />
      <Box
        className="form signInForm"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {Object.keys(initialForms.field).map((item, index) => (
          <Box key={index}>
            <TextField
              size="small"
              label={item}
              {...register(item, {
                ...initialForms.options[item],
                type: "password",
              })}
              fullWidth
              margin="normal"
              type={
                item === "email"
                  ? "email"
                  : item === "password"
                  ? "password"
                  : "text"
              }
            />

            <ErrorMessage
              errors={errors}
              name={item}
              render={({ message }) => (
                <Typography color="primary">{message}</Typography>
              )}
            />
          </Box>
        ))}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
};
const initialForms = {
  field: {
    email: "",
    password: "",
  },
  options: {
    email: { required: "This is required." },
    password: { required: "This is required." },
  },
};
export default Oauth2Form;
