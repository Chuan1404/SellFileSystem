import { Favorite, Person, Search, ShoppingCart } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
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
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];
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
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
            sx={{ width: "50%" }}
          >
            <Autocomplete
              className="header__search"
              options={top100Films}
              sx={{ maxWidth: "100%", width: "100%", marginRight: 2 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
            <Button variant="contained" endIcon={<Search />}>
              Search
            </Button>
          </Stack>

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
                  <MenuItem>
                    <Person />
                    Thông tin tài khoản
                  </MenuItem>
                  <MenuItem>
                    <Favorite />
                    Danh sách yêu thích
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <Favorite />
                    Logout
                  </MenuItem>
                </CustomizedMenus>
                <Link to='/cart' style={{display: 'flex', alignItems: 'center'}}>
                  <IconButton color="primary" sx={{height: 'fit-content'}}>
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
                Sign in
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
