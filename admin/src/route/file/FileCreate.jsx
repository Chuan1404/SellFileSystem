import React from "react";
import { Authenticated, FileUploader } from "../../components";
import { Box, Divider, Typography } from "@mui/material";

const FileCreate = () => {
  return (
    <Authenticated>
      <main id="file_create_page">
        <Typography textAlign={"center"} variant="h3">
          Chọn File
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <FileUploader />
      </main>
    </Authenticated>
  );
};

export default FileCreate;
