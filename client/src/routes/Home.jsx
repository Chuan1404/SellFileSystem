import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Banner, MediaList, Tags } from "../components";
import { fileService } from "../services";
import queryLocation from "../utils/queryLocation";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fromPriceRef = useRef(null);
  const toPriceRef = useRef(null);
  const [option, setOption] = useState({
    page: 1,
    kw: "",
    type: ["PNG", "JPEG"],
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let query = `?${queryLocation.toString(option)}`;
      let res = await fileService.getFiles(query);
      if (!res.error) {
        setData(res);
      }
      setIsLoading(false);
    })();
  }, [option]);

  const handlePriceFilter = () => {
    let fromPrice = fromPriceRef.current.value;
    let toPrice = toPriceRef.current.value;
    if (fromPrice != "" && toPrice != "" && fromPrice > toPrice)
      [fromPrice, toPrice] = [toPrice, fromPrice];

    fromPriceRef.current.value = fromPrice;
    toPriceRef.current.value = toPrice;
    setOption({
      ...option,
      fromPrice,
      toPrice,
    });
  };

  const handleTypeFilter = (value, isCheck) => {
    
    isCheck
      ? setOption({ ...option, type: [...option.type, value] })
      : setOption({
          ...option,
          type: option.type.filter((item) => item != value),
        });
  };
  return (
    <main id="home_page">
      <Banner class="banner" option={option} setOption={setOption} />
      <Box px={2}>
        <Grid container spacing={2}>
          <Grid item sm={12} textAlign={"center"} justifyContent={"center"}>
            <Tags sx={{ mt: 5 }} option={option} setOption={setOption} />
          </Grid>
          {/* <Grid item md={2} xs={12} > */}
          <Grid item sm={12} lg={2} >
            <Box>
              <Typography variant="h6" mb={2}>
                Giá
              </Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <TextField
                  type="number"
                  size="small"
                  placeholder="VNĐ"
                  inputRef={fromPriceRef}
                />
                <Typography>-</Typography>
                <TextField
                  type="number"
                  size="small"
                  placeholder="VNĐ"
                  inputRef={toPriceRef}
                />
              </Stack>
              <Button sx={{ marginTop: 2 }} onClick={handlePriceFilter}>
                Xác nhận
              </Button>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Box>
              <Typography variant="h6" mb={2}>
                Loại file
              </Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked onChange={(e) => handleTypeFilter("PNG", e.target.checked)} />}
                    label="PNG"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked onChange={(e) => handleTypeFilter("JPEG", e.target.checked)}/>}
                    label="JPEG"
                  />
                </FormGroup>
              </Stack>
            </Box>
          </Grid>
          <Grid item lg={10}>
            <MediaList
              data={data}
              option={option}
              setOption={setOption}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
