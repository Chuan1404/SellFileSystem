import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// ---------- init form ----------
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

export default function SignInForm() {
  const dispatcher = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialForms.field,
  });

  // ---------- on form submit ----------
  const onSubmit = async (form) => {
    if (Object.keys(errors).length === 0)
      dispatcher({ type: "SIGNIN", payload: form });
  };
  return (
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
  );
}
