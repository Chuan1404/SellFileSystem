import { Button } from "@mui/material";
import React, { useState } from "react";

const ButtonLoading = ({ children, error = {}, ...res }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    res.onClick && res.onClick();
    setIsLoading(true);
  };
  return isLoading ? (
    "loading"
  ) : (
    <Button {...res} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ButtonLoading;
