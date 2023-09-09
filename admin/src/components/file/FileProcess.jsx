import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import loading from "../../assets/images/loading2.svg";
import { API } from "../../assets/js/constants";
import { callWithToken } from "../../utils/fetchData";
import InputTags from "../InputTags";

const FileProcess = ({ data, handleDelete }) => {
  let tagRef = useRef(null);
  let titleRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let form = new FormData();
    form.append("file", data.file);
    form.append("title", titleRef.current.value);
    form.append("tags", tagRef.current.value);
    let response = await callWithToken(`${API}/file/upload`, {
      method: "POST",
      body: form,
    });
    if (!response.error) {
      handleDelete({ ...data, message: "uploaded" });
      setIsLoading(false);
    } else {
      console.log("Không xóa", data);
    }
  };

  return (
    <Stack className="FileProcess" direction={"row"} spacing={2}>
      <Box className="file">
        <img
          id="preview"
          src={URL.createObjectURL(data.file)}
          style={{ borderRadius: 20 }}
          alt=""
        />
      </Box>

      <Box className="process" padding={2}>
        {data.result?.error ? (
          <Stack justifyContent={"space-between"}>
            <Typography color="primary" variant="h6">
              {data.result.error}
            </Typography>
          </Stack>
        ) : isLoading ? (
          <img src={loading} className="imgLoading" />
        ) : (
          <Stack justifyContent={"flex-start"} flexGrow={1}>
            <Typography variant="h6" marginBottom={2}>
              Share it to the others
            </Typography>
            <TextField
              inputRef={titleRef}
              label="Tiêu đề"
              size="small"
              sx={{ marginBottom: 4, width: 300 }}
            />
            <InputTags ref={tagRef} />

            <Stack
              direction={"row"}
              spacing={2}
              marginTop={"auto"}
              marginLeft={"auto"}
            >
              <Button variant="text" color="secondary" onClick={handleDelete}>
                Xóa
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Xác nhận
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default FileProcess;
