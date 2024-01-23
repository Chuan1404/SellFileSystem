import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { tagService } from "../services";
import useQuery from "../hooks/useQuery";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  overflow: hidden;
  border-radius: 20px;
  & input, label {
    padding-left: 10px !important;
  }
`;

const Search = ({ options = {}, setOption = () => {}, bgColor = "transparent", ...props }) => {
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
    <Box width={'100%'} {...props}>
      <SearchWrapper bgColor={bgColor}>
        <Autocomplete
          className="search"
          options={tags}
          fullWidth
          onChange={(e, value) => {
            setKw(value);
            handleSearch(value);
          }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setKw(e.target.value)}
              fullWidth
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
          <SearchIcon color="white" />
        </Button>
      </SearchWrapper>
    </Box>
  );
};

export default Search;
