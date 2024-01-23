import {
  CloudDownload,
  Logout,
  Receipt,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../store/slices/authSlice";
import { openAuth } from "../store/slices/pageSlice";
import CustomizedMenus from "./CustomizedMenus";
import Search from "./Search";

export default function Header({ style = "bright" }) {
  const dispatcher = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const cart = useSelector((store) => store.cart.values);
  const ref = useRef(null);
  const location = useLocation();

  // ---------- Sign in click ----------
  const handleSignIn = () => {
    dispatcher(openAuth());
  };

  // ---------- Sign out click ----------
  const handleSignOut = () => {
    dispatcher(signOut());
  };

  const handleScroll = () => {
    if (location.pathname == "/") {
      let scrolled = window.scrollY;
      let height = ref.current.offsetHeight;
      scrolled >= height
        ? ref.current.classList.add("scroll")
        : ref.current.classList.remove("scroll");
    }
  };

  useEffect(() => {
    if (location.pathname == "/")
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Box component={"header"} className={`header ${window.location.pathname != "/" && "scroll"}`} ref={ref}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
        sx={{ height: "100%" }}
      >
        <Box className="header_logo">
          <Link to="/">
            <h1 variant="h3">DevChu</h1>
          </Link>
        </Box>

        <Box
          className="header__middle"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Search bgColor="#fff" />
        </Box>

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
                  <Badge badgeContent={cart[user.id]?.length} color="secondary">
                    <ShoppingCart sx={{ transition: "0.4s" }} />
                  </Badge>
                </IconButton>
              </Link>
            </Stack>
          ) : (
            <Button
              variant="text"
              onClick={handleSignIn}
              sx={{ alignSelf: "center" }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
