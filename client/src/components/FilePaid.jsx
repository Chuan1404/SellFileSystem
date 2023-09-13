import { Laptop, PhoneAndroid, Tablet } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import fileService from "../services/fileService";
import FileSaver from "file-saver";

const FilePaid = ({ data, ...res }) => {
  const [device, setDevice] = useState("laptop");
  const aRef = useRef(null);
  const handleDevice = (event, newDevice) => {
    if (newDevice != null) {
      setDevice(newDevice);
    }
  };

  const handleDownload = async () => {
    const res = await fileService.downloadFile(data.file.id);
    const blob = new Blob([res]);
    console.log(res)
    console.log(blob)

    FileSaver.saveAs(blob, 'myImage.jpg');
    
    // aRef.current.href= URL.createObjectURL(blob)
    // aRef.current.download = 'image.jpg';
    // aRef.current.click();

  };

  return (
    <Paper elevation={3} style={{ marginBottom: 20 }} {...res}>
      <a href="" ref={aRef}></a>
      <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
        <Box width={400}>
          <img
            style={{ borderRadius: "10px" }}
            width={"100%"}
            src={data.file.display}
          />
        </Box>

        <Stack width={"100%"}>
          <Typography variant="h4">{data.file.title}</Typography>
          <ToggleButtonGroup
            value={device}
            exclusive
            onChange={handleDevice}
            aria-label="device"
            sx={{ my: 2 }}
          >
            <ToggleButton value="laptop" aria-label="laptop">
              <Laptop />
            </ToggleButton>
            <ToggleButton value="tablet" aria-label="tablet">
              <Tablet />
            </ToggleButton>
            <ToggleButton value="phone" aria-label="phone">
              <PhoneAndroid />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="h6">{`Có hiệu lực đến: Ngày ${data.expireDate[2]} Tháng ${data.expireDate[1]} Năm ${data.expireDate[0]}`}</Typography>

          <Button
            variant="contained"
            sx={{ marginTop: "auto", marginLeft: "auto" }}
            onClick={handleDownload}
          >
            Tải về
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FilePaid;
