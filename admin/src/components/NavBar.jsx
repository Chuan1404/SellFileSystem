import {
  ArrowRight,
  BarChart,
  ChatBubble,
  CloudDownload,
  Dashboard,
  Group,
  KeyboardArrowDown,
  Mail,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import classnames from "classnames";
import { forwardRef, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Authenticated from "./Authenticated";
import { useSelector } from "react-redux";

const NavBar = forwardRef((props, ref) => {
  const theme = useTheme();
  const { user } = useSelector((store) => store.auth);

  const routeData = useMemo(
    () => [
      {
        title: "Dashboard",
        path: "/",
        icon: <Dashboard />,
        allowRoles: ["ROLE_ADMIN", "ROLE_EDITOR"],
      },
      {
        title: "Tài khoản",
        path: "/user",
        icon: <Group />,
        children: [
          { title: "Khách hàng", path: "/customer" },
          { title: "Chỉnh sửa viên", path: "/employee" },
          { title: "Thêm nhân viên", path: "/create" },
        ],
        allowRoles: ["ROLE_ADMIN"],
      },
      {
        title: "File",
        path: "/file",
        icon: <CloudDownload />,
        children: [
          { title: "Thêm File", path: "/create" },
          { title: "Danh sách File", path: "/list" },
        ],
        allowRoles: ["ROLE_ADMIN", "ROLE_EDITOR"],
      },
      
      // {
      //   title: "Trò chuyện",
      //   path: "/chat",
      //   icon: <ChatBubble />,
      //   allowRoles: ["ROLE_ADMIN"],
      // },
      // {
      //   title: "Mail",
      //   path: "/mail",
      //   icon: <Mail />,
      //   allowRoles: ["ROLE_ADMIN"],
      // },
    ],
    []
  );
  const [arrayIndexShow, setArrayIndexShow] = useState(() => {
    return routeData.map((item) => false);
  });

  const handleNavLinkClick = (index) => (e) => {
    if (e.currentTarget.classList.contains("disable")) {
      e.preventDefault();
      let newArray = [...arrayIndexShow];
      newArray[index] = !newArray[index];
      setArrayIndexShow([...newArray]);
    }
  };

  return (
    <Authenticated>
      <Box
        className="navBar active"
        ref={ref}
        bgcolor={theme.palette.secondary.main}
      >
        <List className="navBar__list" disablePadding>
          {routeData.map((item, index) => {
            let roles = item.allowRoles?.filter((role) =>
              user.userRoles?.includes(role)
            );
            return (
              roles != undefined &&
              roles.length > 0 && (
                <Box key={index} className="navBar__list--box">
                  <ListItemButton className="navBar__list--item">
                    <NavLink
                      to={item.path}
                      className={classnames({
                        disable: item.children?.length > 0,
                      })}
                      onClick={handleNavLinkClick(index)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText sx={{ minWidth: 0 }}>
                        {item.title}
                      </ListItemText>

                      {item.children?.length > 0 && (
                        <ListItemButton
                          className="down-btn"
                          sx={{ ml: "auto", p: 0, justifyContent: "flex-end" }}
                        >
                          <KeyboardArrowDown />
                        </ListItemButton>
                      )}
                    </NavLink>
                  </ListItemButton>
                  <Collapse
                    className="navBar__list--collapse"
                    in={arrayIndexShow[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {item.children?.map((child, index) => (
                        <ListItemButton
                          key={index}
                          className="navBar__list--item"
                        >
                          <NavLink to={item.path + child.path}>
                            <ListItemIcon>
                              <ArrowRight fontSize="large" />
                            </ListItemIcon>
                            <ListItemText>{child.title}</ListItemText>
                          </NavLink>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              )
            );
          })}
        </List>
      </Box>
    </Authenticated>
  );
});

export default NavBar;
