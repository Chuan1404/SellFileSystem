import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import fileService from "../services/fileService";
import queryLocation from "../utils/queryLocation";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function MediaList() {
  const [renderData, setRenderData] = useState([]);
  const [fileData, setFileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState({ page: 1 });
  const currentPage = useRef(1);

  useEffect(() => {
    (async () => {
      let query = `?${queryLocation.toString(option)}`;
      let res = await fileService.getFiles(query);
      if (!res.error) {
        currentPage.current = option.page;
        console.log("ref", currentPage.current);
        setRenderData([...renderData, ...res.content]);
      }
    })();
  }, [option]);
  return (
    <Box className="mediaList">
      {/* <Tags /> */}

      <Box className="mediaList__items" marginTop={2}>
        {!isLoading ? (
          renderData.map((item, index) => (
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
          <Typography>Bạn đã xem toàn bộ file hiện có</Typography>
        )}
      </Box>
      <Button variant="contained" onClick={() => {setOption({...option, page: option.page + 1})}}>Xem thêm</Button>
    </Box>
  );
}
