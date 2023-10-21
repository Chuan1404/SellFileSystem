import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField
} from "@mui/material";
import { useState } from "react";
import myImage from "../assets/images/10.jpg";
import useQuery from "../hooks/useQuery";
import { tagService } from "../services";

export default function Banner({ image, options = {}, setOption }) {
  const [kw, setKw] = useState("");
  const { data: tags, fetching: isLoading } = useQuery(
    () => tagService.getByKw(kw),
    [kw]
  );
  
  const handleSearch = (currentValue = null) => {
    let value =
      currentValue != undefined && currentValue != null ? currentValue : kw;
    setOption({ ...options, kw: value });
  };
  

  return (
    <Box className="banner" sx={{ height: 500 }} bgcolor="secondary">
      <Stack
        direction={"row"}
        justifyContent="space-between"
        className="banner__content"
        sx={{ width: "50%" }}
        padding={2}
        borderRadius={15}
      >
        <Autocomplete
          className="header__search"
          options={tags}
          sx={{ maxWidth: "100%", width: "100%", background: "white" }}
          onChange={(e, value) => {
            setKw(value);
            handleSearch(value);
          }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setKw(e.target.value)}
              variant="filled"
              {...params}
              label="Tìm kiếm theo tag"
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch(options.kw)}
        >
          <Search />
        </Button>
      </Stack>
      <img className="position-center" src={image ? image : myImage} alt="" />
    </Box>
  );
}
