import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import loading from "../../assets/images/loading2.svg";
import notSupport from "../../assets/images/errors/not-support.gif";
import { API } from "../../assets/js/constants";
import { callWithToken } from "../../utils/fetchData";
import InputTags from "../InputTags";
import { useDispatch } from "react-redux";
import {openAlert} from '../../store/slices/pageSlice'

const FileProcess = ({ data, handleDelete }) => {
  let tagRef = useRef(null);
  let titleRef = useRef(null);
  let priceRef = useRef(0);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if(titleRef.current.value == '' || priceRef.current.value < 10000 || tagRef.current.value == '') return
    setIsLoading(true);
    let form = new FormData();
    form.append("file", data.file);
    form.append("title", titleRef.current.value);
    form.append("price", priceRef.current.value);
    form.append("tags", tagRef.current.value);
    let response = await callWithToken(`${API}/file/upload`, {
      method: "POST",
      body: form,
    });
    
    if (!response.error) {
      handleDelete({ ...data, message: "uploaded" });
      setIsLoading(false);
      dispatch(
        openAlert({ type: "success", message: "Đã thêm sản phẩm vào giỏ hàng" })
      );
    } 
  };
  return (
    <Stack className="FileProcess" direction={"row"} spacing={2}>
      <Box className="file">
        {data?.file.type.startsWith("image/") ? (
          <img
            id="preview"
            src={URL.createObjectURL(data.file)}
            style={{ borderRadius: 20 }}
            alt=""
          />
        ) : (
          <img src={notSupport} />
        )}
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
              Chia sẻ với mọi người
            </Typography>
            <TextField
              inputRef={titleRef}
              label="Tiêu đề"
              size="small"
              sx={{ marginBottom: 4, width: 300 }}
            />
            
             <TextField
              inputRef={priceRef}
              type="number"
              label="Giá (Tối thiểu 10.000 VNĐ)"
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
