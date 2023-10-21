import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import myImage from "../../assets/images/11.jpg";
import { useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import userService from "../../services/userService";

const UserInfo = () => {
  const { user } = useSelector((store) => store.auth);
  const { data: fileData, setData: setFiledata } = useQuery(() =>
    userService.getFile()
  );
  console.log(fileData);
  return (
    <main id="user_info_page">
      <Box className="banner" sx={{ height: 300 }} bgcolor="secondary">
        <Stack
          padding={2}
          position={"absolute"}
          bottom={0}
          left={0}
          zIndex={3}
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"flex-end"}
        >
          <Avatar src={user.avatar} sx={{ width: 150, height: 150 }} />
          <ButtonGroup>
            <Button>Test</Button>
          </ButtonGroup>
        </Stack>

        <img className="position-center" src={myImage} alt="" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          {fileData.content?.length == 0 ? (
            <Typography>Chưa có sản phẩm nào</Typography>
          ) : (
            fileData.content?.map((file) => (
              <Stack spacing={2} direction={"row"}>
                <Box>
                  <img
                    src={file.display}
                    width={300}
                    style={{ borderRadius: 15 }}
                    alt=""
                  />
                </Box>
                <Box width={'100%'}>
                  <Typography textAlign={"center"} variant="h6">{file.title}</Typography>
                  <Typography>Giá bán: {file.price}</Typography>
                  <Typography>Lượt mua: 5</Typography>

                </Box>
              </Stack>
            ))
          )}
          <Grid item xs={12}>
            {fileData.totalPages > 0 && (
              <Pagination count={fileData.totalPages} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default UserInfo;
