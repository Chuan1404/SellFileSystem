import { Delete } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

const FileInCart = ({ file, handleDelete }) => {
  return (
    <Grid
      container
      gap={2}
      alignItems={"center"}
      border={"1px solid rgba(12,18,28,.12)"}
      borderRadius={10}
      padding={2}
      marginBottom={2}
    >
      <Grid item xs={4}>
        <Box>
          <img
            width={"100%"}
            src={file.display}
            alt=""
            style={{ borderRadius: 10, verticalAlign: "bottom" }}
          />
        </Box>
      </Grid>
      <Grid item xs>
        <Typography variant="body1">{file.title}</Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="h6">{file.price} đ</Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FileInCart;
