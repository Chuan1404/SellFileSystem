import { ErrorMessage } from "@hookform/error-message";
import { People } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const Form = ({ formItems = [], onSubmit, errors = {}, ...props }) => {
  const isContainFile = !formItems.every((item) => item.type != "file");
  const theme = useTheme();

  return (
    <Box component={"form"} {...props}  onSubmit={onSubmit}>
      <Grid container>
        {isContainFile && (
          <Grid item xs>
            <Stack
              width={"100%"}
              height={300}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={20}
            >
              <Box
                height={250}
                width={250}
                borderRadius={"50%"}
                border={`1px solid ${theme.palette.primary.main}`}
                overflow={"hidden"}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                  }}
                  className="f-center"
                  color="primary"
                >
                  <input type="file" hidden />
                  <People sx={{ fontSize: "7rem !important" }} />
                  <Typography variant="h6" color={"white"}>
                    Upload File
                  </Typography>
                </Button>
              </Box>
            </Stack>

            {/* <TextField {...formItems.find((item) => item.type == "file")} /> */}
          </Grid>
        )}

        <Grid
          item
          xs={7}
          margin={!isContainFile && "auto"}
          paddingX={isContainFile && 4}
        >
          {formItems.map((item, index) => {
            if (item.type == "text" || item.type == "password")
              return (
                <>
                  <TextField margin="normal" key={index} fullWidth {...item} />
                  <ErrorMessage
                    errors={errors}
                    name={item.name}
                    render={({ message }) => (
                      <Typography color="primary">{message}</Typography>
                    )}
                  />
                </>
              );
            if (item.type == "autocomplete")
              return (
                <Autocomplete
                multiple
                  key={index}
                  defaultValue={["ROLE_EDITOR"]}
                  options={["ROLE_EDITOR"]}
                  renderInput={(param) => (
                    <TextField margin="normal" {...param} {...item} />
                  )}
                />
              );
          })}

          <Box textAlign={"center"} marginTop={2}>
            <Button
              sx={{ maxWidth: "50%" }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Xác nhận
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
