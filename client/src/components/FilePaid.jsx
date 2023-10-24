import {
  DevicesOther,
  Laptop,
  PhoneAndroid,
  Tablet,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import fileService from "../services/fileService";
import FileSaver from "file-saver";
import { useDispatch } from "react-redux";
import { openAlert } from "../store/slices/pageSlice";
import { Link } from "react-router-dom";
import loading from "../assets/images/loading2.svg"

const FilePaid = ({ data, ...res }) => {
  const [device, setDevice] = useState("laptop");
  const [isDownloading, setIsDownloading] = useState(false);
  const [definition, setDefinition] = useState({
    width: data.file.width,
    height: data.file.height,
  });
  const aRef = useRef(null);
  const dispatch = useDispatch();

  const handleDevice = (event, newDevice) => {
    let width, height;
    let rate = data.file.width / data.file.height;
    rate = rate < 1 ? rate : 1 / rate;

    if (newDevice != "other") {
      switch (newDevice) {
        case "phone":
          width = 640;
          height = Math.round(640 * rate);
          break;
        case "tablet":
          width = 1280;
          height = Math.round(1280 * rate);
          break;
        case "laptop":
          width = 1920;
          height = Math.round(1920 * rate);
          break;
      }
      if (data.file.width - data.file.height < 0) {
        let tmp = width;
        width = height;
        height = tmp;
      }
      setDefinition({
        width,
        height,
      });
    }
    newDevice != null && setDevice(newDevice);
  };
  const handleDownload = async () => {
    setIsDownloading(true)
    const res = await fileService.downloadFile(data.file.id, definition);
    if (res.byteLength > 0) {
      const blob = new Blob([res]);
      FileSaver.saveAs(blob, "myImage.jpg");
    } else {
      dispatch(openAlert({ type: "error", message: "Invalid" }));
    }
    setIsDownloading(false)
  };

  const handleInputChange = (e) => {
    if (e.target.value > data.file.width) return;

    setDefinition({
      width: e.target.value,
      height: Math.round(
        e.target.value * (data.file?.height / data.file?.width)
      ),
    });
  };

  return (
    <Paper elevation={3} style={{ marginBottom: 20 }} {...res}>
      <a href="" ref={aRef}></a>
      <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
        <Box width={400}>
          <img
            style={{ borderRadius: "10px" }}
            width={"100%"}
            src={data.file.medium}
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
            <ToggleButton value="other" aria-label="other">
              <DevicesOther />
            </ToggleButton>
          </ToggleButtonGroup>

          {device == "other" && (
            <Stack
              marginBottom={3}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
            >
              <Typography>Kích thước:</Typography>
              <TextField
                onInput={handleInputChange}
                value={definition.width}
                placeholder={`Tối đa ${data.file?.width} px`}
                type="number"
                size="small"
              />
              <Typography>x</Typography>
              <TextField
                value={definition.height}
                placeholder={`Tối đa ${data.file?.height} px`}
                disabled
                type="number"
                size="small"
              />
            </Stack>
          )}

          <Typography variant="h6">{`Có hiệu lực đến: Ngày ${data.expireDate[2]} Tháng ${data.expireDate[1]} Năm ${data.expireDate[0]}`}</Typography>

          {isValid(data.expireDate) ? (
            isDownloading ? (
              <img src={loading} width={50} style={{marginLeft: 'auto'}}/>
            ) : (
              <Button
              variant="contained"
              sx={{ marginTop: "auto", marginLeft: "auto" }}
              onClick={handleDownload}
            >
              Tải về
            </Button>
            )
          ) : (
            <Link
              to={`/file/detail/${data.file?.id}`}
              sx={{ display: "block", marginTop: "auto", marginLeft: "auto" }}
            >
              <Button variant="contained">Gia hạn</Button>
            </Link>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

function isValid(data) {
  const fileDate = new Date(
    data[0],
    data[1] - 1,
    data[2],
    data[3],
    data[4],
    data[5]
  );
  const today = new Date();
  return fileDate - today > 0;
}
export default FilePaid;
