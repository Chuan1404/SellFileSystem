import {
  Logout,
  Menu,
  Notifications,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Authenticated from "./Authenticated";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/slices/authSlice";

const Header = ({ handleNavBarControlClick, ...props }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isRightMenuShow, setRightMenuShow] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const handleRightClick = () => {
    setRightMenuShow(!isRightMenuShow);
  };

  const handleSignout = () => {
    dispatch(signOut());
  };
  return (
    <Authenticated>
      <Stack
        className="header"
        direction={"row"}
        alignItems={"center"}
        bgcolor={theme.palette.secondary.main}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          className="header__left"
        >
          <Box>
            <Typography color={"primary"} variant="h3">
              DevChu
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNavBarControlClick}
          >
            <Menu />
          </Button>
        </Stack>
        <Stack
          className="header__right"
          direction={"row"}
          alignItems={"center"}
          sx={{ ml: "auto", height: "100%" }}
          spacing={2}
        >
          {/* <Box>
            <Badge badgeContent={4} color="primary">
              <Notifications color="white" />
            </Badge>
          </Box> */}
          <Box>
            <IconButton onClick={handleRightClick}>
              <Avatar src={user.avatar} />
              <Settings color="white" />
            </IconButton>
            {isRightMenuShow && (
              <Paper className="header__right--paper">
                <MenuList>
                  {/* <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Thông tin người dùng</ListItemText>
                  </MenuItem> */}
                  <Divider />
                  <MenuItem onClick={handleSignout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Đăng xuất</ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            )}
          </Box>
        </Stack>
      </Stack>
    </Authenticated>
  );
};

export default Header;
