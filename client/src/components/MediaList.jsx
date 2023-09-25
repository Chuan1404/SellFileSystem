import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fileService from "../services/fileService";
import queryLocation from "../utils/queryLocation";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";

export default function MediaList() {
  const [renderData, setRenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState({ page: 1 });

  const fetchData = async () => {
    let query = `?${queryLocation.toString(option)}`;
    let res = await fileService.getFiles(query);
    if (!res.error) {
      setRenderData(res);
    }
  };
  const handleChange = (event, value) => {
    setOption({...option, page: value})
  }
  // fetch data first time
  useEffect(() => {
    window.scrollTo({
      top: 0
    })
    setIsLoading(true)
    fetchData();
    setIsLoading(false)
    
  }, [option]);
  return (
    <Box className="mediaList">
      {/* <Tags /> */}

      <Box className="mediaList__items" marginTop={2}>
        {!isLoading ? (
          renderData?.content?.map((item, index) => (
            <Link key={index} to={`/file/detail/${item.id}`}>
              <Box className="mediaList__items--item">
                <img src={item.display} />

                <Box className="mediaList__items--item--hover">
                  <Stack className="control">
                    <IconButton
                      sx={{ justifyContent: "end", width: "initial" }}
                    >
                      <FavoriteBorderOutlined color="primary" />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </Link>
          ))
        ) : (
          <Typography>...Loading</Typography>
        )}
      </Box>
      <Box className="mediaList__pagination" m={5}>
        <Pagination count={renderData?.totalPages} color="primary" onChange={handleChange}/>
      </Box>
    </Box>
  );
}
