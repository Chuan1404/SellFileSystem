import { Box, Container, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Oauth2Form from "../components/Oauth2Form";

const Auth = () => {
  const user = useSelector(store => store.auth.user)
  const isLogin = Object.keys(user).length > 0;
  if(isLogin) {
    return <Navigate to={'/'}/>
  }
  return (
    <MyBox className="login_page">
      <Container
        sx={{
          height: "100%",
          display: "flex" ,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Oauth2Form />
      </Container>
    </MyBox>
  );
};

const MyBox = ({ children, ...res }) => {
  const theme = useTheme();
  const style = {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  };
  return (
    <Box height={"100vh"} width={"100vw"} sx={style} {...res}>
      {children}
    </Box>
  );
};

export default Auth;
