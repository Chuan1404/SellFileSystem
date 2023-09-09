import { People } from "@mui/icons-material";
import {
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

const Form = ({ formItems = [], onSubmit, ...props }) => {
  const isContainFile = !formItems.every((item) => item.type != "file");
  const theme = useTheme();
  return (
    <form {...props}>
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
                  <Typography variant="h6" color={"white"}>Upload File</Typography>
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
                <TextField margin="normal" key={index} fullWidth {...item} />
              );
            if (item.type == "boolean")
              return (
                <FormControlLabel
                  key={index}
                  control={<Switch color="primary" />}
                  {...item}
                />
              );
          })}

          <Box textAlign={"center"}>
            <Button
              sx={{ maxWidth: "50%" }}
              fullWidth
              variant="contained"
              type="submit"
              onClick={onSubmit}
            >
              Xác nhận
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
