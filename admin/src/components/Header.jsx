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
import { useSelector } from "react-redux";
import Authenticated from "./Authenticated";

const Header = ({ handleNavBarControlClick, ...props }) => {
  const theme = useTheme();
  const [isRightMenuShow, setRightMenuShow] = useState(false);
  const handleRightClick = () => {
    setRightMenuShow(!isRightMenuShow);
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
              Logo
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
          <Box>
            <Badge badgeContent={4} color="primary">
              <Notifications color="white" />
            </Badge>
          </Box>
          <Box>
            <IconButton onClick={handleRightClick}>
              <Avatar>Â</Avatar>
              <Settings color="white" />
            </IconButton>
            {isRightMenuShow && (
              <Paper className="header__right--paper">
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>User info</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            )}
          </Box>
        </Stack>
      </Stack>
    </Authenticated >
  );
};

export default Header;
