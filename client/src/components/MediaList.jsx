import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, IconButton, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import loading from '../assets/images/loading2.svg';

export default function MediaList({data , isLoading, option, setOption, ...res}) {

  const handleChange = (event, value) => {
    setOption({ ...option, page: value });
  };
  return (
    <Box className="mediaList">
      <Box className="mediaList__items" marginTop={2}>
        {!isLoading ? (
          data?.content?.map((item, index) => (
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
          <Stack alignItems={"center"}><img src={loading} width={50}/></Stack>
        )}
      </Box>
      <Box className="mediaList__pagination" m={5}>
        <Pagination
          count={data?.totalPages}
          color="primary"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
