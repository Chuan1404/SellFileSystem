import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuth, openAuth } from "../../store/slices/pageSlice";

const Authenticated = ({ children }) => {
  const { isLogin } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogin) {
      dispatch(openAuth());
    } else {
      dispatch(closeAuth());
    }
  }, [isLogin]);
  if (!isLogin) {
    return;
  }
  return { ...children };
};

export default Authenticated;
