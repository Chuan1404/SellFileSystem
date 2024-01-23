import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
    width: 30rem;
    heighr: 5rem;
    background-color: white;
`

const SearchBox = () => {
  return <Box>
    <SearchWrapper className="searchBox__wrapper">
        <Box className="searchBox__bar">

        </Box>
        <Button>

        </Button>
    </SearchWrapper>
  </Box>;
};

export default SearchBox;
