import {
  CloudDownload,
  Logout,
  Person,
  Receipt,
  ShoppingCart
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../store/slices/authSlice";
import { openAuth } from "../store/slices/pageSlice";
import CustomizedMenus from "./CustomizedMenus";

export default function Header() {
  const dispatcher = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const cart = useSelector((store) => store.cart.values);

  // ---------- Sign in click ----------
  const handleSignIn = () => {
    dispatcher(openAuth());
  };

  // ---------- Sign out click ----------
  const handleSignOut = () => {
    dispatcher(signOut());
  };

  return (
    <Box component={"header"} id="header" bgcolor={"#fff"}>
      <Container sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <div className="header_logo">
            <Link to="/">
              <Typography variant="h3">DevChu</Typography>
            </Link>
          </div>

          <Box className="header__right">
            {Object.keys(user).length > 0 ? (
              <Stack direction={"row"} spacing={1}>
                <CustomizedMenus
                  ButtonMenu={
                    <Button>
                      <Avatar src={user.avatar} sx={{ marginRight: 1 }} />
                      <Typography>{user.name}</Typography>
                    </Button>
                  }
                >
                  {/* <Link to={"/user/info"}>
                    <MenuItem>
                      <Person />
                      Thông tin tài khoản
                    </MenuItem>
                  </Link> */}

                  <Link to={"/user/paid"}>
                    <MenuItem>
                      <CloudDownload />
                      Sản phẩm của tôi
                    </MenuItem>
                  </Link>

                  <Link to={"/user/receipt"}>
                    <MenuItem>
                      <Receipt />
                      Hóa đơn của tôi
                    </MenuItem>
                  </Link>
                  {/* <MenuItem>
                    <Favorite />
                    Danh sách yêu thích
                  </MenuItem> */}
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <Logout />
                    Đăng xuất
                  </MenuItem>
                </CustomizedMenus>
                <Link
                  to="/cart"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton color="primary" sx={{ height: "fit-content" }}>
                    <Badge
                      badgeContent={cart[user.id]?.length}
                      color="secondary"
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Link>
              </Stack>
            ) : (
              <Button
                variant="contained"
                onClick={handleSignIn}
                sx={{ alignSelf: "center" }}
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
