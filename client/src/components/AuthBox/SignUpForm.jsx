import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import { closeAuth } from "../../store/slices/pageSlice";
import loading from '../../assets/images/loading2.svg'

// ---------- init form ----------
const initialForms = {
  field: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  options: {
    name: { required: "This is required." },
    email: { required: "This is required." },
    password: { required: "This is required." },
    confirmPassword: { required: "This is required." },
  },
};

export default function SignUpForm() {
  const dispatcher = useDispatch();
  const [options, setOptions] = useState({
    isShow: false,
    isLoading: false,
  });

  // ---------- useForm ----------
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: initialForms.field,
  });

  // ---------- on form submit ----------
  const onSubmit = async (form) => {
    const { email, password, confirmPassword, name } = form;
    const errs = { ...errors };

    // password validate
    if (password !== confirmPassword) {
      errs.confirmPassword = { message: "Not matching password" };
      setError("confirmPassword", { message: "Not matching password" });
      return;
    }

    if (Object.keys(errs).length === 0) {
      setOptions({ ...options, isLoading: true });
      const response = await authService.signUp({ email, name, password });
      if (response.error) {
        setError("email", { message: response.error })
        setOptions({ ...options, isLoading: false })
      }
      else setOptions({ ...options, isShow: true });
    } 
  };
  // ---------- handle close dialog ----------
  const handleClose = () => {
    setOptions({ ...options, isShow: false });
    dispatcher(closeAuth());
  };
  return (
    <Box
      className="form signUpForm"
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
                : item === "password" || item === "confirmPassword"
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

      {options.isLoading ? (
        <Stack justifyContent={"center"}>
          <img src={loading} height={50} />
        </Stack>
      ) : (
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Sign up
        </Button>
      )}

      <Dialog
        open={options.isShow}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Verify your account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Register success. Please verify your account in email
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
