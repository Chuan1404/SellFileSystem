import { FavoriteBorder, Share } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import loading from "../../assets/images/loading2.svg";
import { CommentBox } from "../../components";
import useQuery from "../../hooks/useQuery";
import { fileService } from "../../services";
import { addFile } from "../../store/slices/cartSlice";
import { openAlert, openAuth } from "../../store/slices/pageSlice";

export default function FileDetail() {
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const { data: file, fetching: isLoading } = useQuery(
    () => fileService.getFile(id),
    [id]
  );

  const addProductToCart = () => {
    if (isLogin) {
      dispatch(addFile({ userId: user.id, file: file }));
      dispatch(
        openAlert({ type: "success", message: "Đã thêm sản phẩm vào giỏ hàng" })
      );
    } else {
      dispatch(openAuth());
    }
  };
  window.scrollTo({ top: 0 });
  return (
    <main id="filepage">
      <Container sx={{ pt: 7 }}>
        <FormControl fullWidth>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack
                sx={{ height: "80vh" }}
                marginBottom={2}
                justifyContent={"center"}
                alignContent={"center"}
              >
                {isLoading && (
                  <img
                    src={loading}
                    style={{ height: 40, userSelect: "none" }}
                  />
                )}
                {!isLoading && (
                  <img
                    src={file.medium}
                    style={{ objectFit: "contain", height: "100%" }}
                  />
                )}
              </Stack>
              <CommentBox />
            </Grid>
            <Grid item xs={4}>
              <Typography align="center" variant="h6">
                {file.title}
              </Typography>

              <Box padding={2}>
                <Stack direction={"row"} spacing={2}>
                  <Button fullWidth startIcon={<FavoriteBorder />}>
                    32
                  </Button>
                  <Button fullWidth>
                    <Share />
                  </Button>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  onClick={addProductToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </main>
  );
}
