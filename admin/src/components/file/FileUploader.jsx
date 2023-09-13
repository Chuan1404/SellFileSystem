import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileProcess from "./FileProcess";
import { v4 as uuidv4 } from "uuid";
import loading from "../../assets/images/loading2.svg";
import { API } from "../../assets/js/constants";
import { callWithToken } from "../../utils/fetchData";

const FileUploader = ({ width = "100%" }) => {
  const [files, setFiles] = useState([]);
  const [fileLoaded, setFileLoaded] = useState([]);

  // add file need to load
  const handleChange = (e) => {
    let currentFiles = [...files];
    [...e.target.files].forEach((file) => {
      currentFiles.unshift({
        id: uuidv4(),
        file,
      });
    });
    setFiles(currentFiles);
  };

  // delete handled file
  const handleDelete = (file) => {
    setFileLoaded((prestate) => prestate.filter((item) => item.id != file.id));
  };

  useEffect(() => {
    let fileHandle = [];
    files.forEach(async function (item) {
      let formData = new FormData();
      formData.append("file", item.file);
      let result = await callWithToken(`${API}/file/check`, {
        method: "POST",
        body: formData,
      });
      fileHandle.unshift({ ...item, result });
      if (fileLoaded.findIndex((loaded) => loaded.id === item.id) < 0)
        setFileLoaded([...fileHandle, ...fileLoaded]);
    });
  }, [files]);

  useEffect(() => {
    let idList = fileLoaded.map((item) => item.id);
    let filters = files.filter((item) => !idList.includes(item.id));

    if (files.length != 0) setFiles(filters);
  }, [fileLoaded]);
  return (
    <Box className="FileUploader">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
        color={"#7D8893"}
        bgcolor={"#F8F9F9"}
        border={"1px dashed rgba(43, 59, 74, 0.3)"}
        borderRadius={3}
        width={width}
        className="FileUploader__loader"
      >
        <Typography variant="body1">Choose file</Typography>
        <Button variant="contained" component="label">
          <input type="file" hidden onChange={handleChange} multiple />
          Select Files
        </Button>
      </Stack>
      <Box className="FileUploader__list">
        {files.map((item, index) => (
          <img className="imgLoading" key={index} src={loading} />
        ))}
        {fileLoaded.map((item) => (
          <FileProcess
            key={item.id}
            handleDelete={() => handleDelete(item)}
            data={item}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FileUploader;
