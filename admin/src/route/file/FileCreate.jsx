import React from "react";
import { Authenticated, FileUploader } from "../../components";
import { Box, Divider, Typography } from "@mui/material";

const FileCreate = () => {
  return (
    <Authenticated>
      <main id="file_create_page">
        <Box>
          <Typography variant="h3">Chọn File</Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <FileUploader />
      </main>
    </Authenticated>
  );
};

export default FileCreate;
