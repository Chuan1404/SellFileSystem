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
import { authService } from "../services";
import { signIn } from "../store/slices/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Oauth2Form = () => {
  const dispatcher = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialForms.field,
  });

  const handleSuccess = (credentialResponse) => {
    const data = jwt_decode(credentialResponse.credential);
    if (!data.error) {
      dispatcher({ type: "OAUTH2", payload: data });
    } else {
      setError("email", { message: data.error });
    }
  }
  // ---------- on form submit ----------
  const onSubmit = async (form) => {
    const response = await authService.signIn(form);
    if (!response.error) {
      dispatcher(signIn(response));
      dispatcher({ type: "FETCH_INFO" });
    } else {
      setError("email", { message: response.error });
    }
  };
  return (
    <Box sx={{ maxWidth: 400 }} bgcolor={"#fff"} p={4}>
      <Typography variant="h5" textAlign={"center"}>
        Chào mừng đến với website của chúng tôi
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction={"row"}
        alignItems={"baseline"}
        justifyContent={"center"}
        spacing={2}
      >
        <GoogleOAuthProvider clientId="1072091574856-ohepmk122fqm9sch172c7tr0mfagb5oh.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credential => handleSuccess(credential)}
          onError={() => {console.log('Login Failed')}}
        />
      </GoogleOAuthProvider>
        
      </Stack>
      <Divider sx={{ my: 2 }} />

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
