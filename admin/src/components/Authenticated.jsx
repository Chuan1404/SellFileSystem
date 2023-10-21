import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authenticated = ({ children}) => {
  const user = useSelector((store) => store.auth.user);
  const isLogin = Object.keys(user).length > 0;
  if (!isLogin) {
    return (
      <Navigate to={"/auth"}  />
    );
  }
   
  return { ...children };
};

export default Authenticated;
