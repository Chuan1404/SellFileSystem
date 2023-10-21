import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { FormPopup, Header, Loading, MyAlert, NavBar, Popup } from "./components";
import { pink } from "@mui/material/colors";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Router from "./Router";
function App() {
  const theme = createTheme({
    palette: {
      primary: pink,
      secondary: {
        main: "#191b26",
      },
      white: {
        main: "#fff",
      },
    },
  });

  const navBarRef = useRef(null);
  const handleNavBarControlClick = () => {
    navBarRef.current.classList.toggle("active");
  };

  const popup = useSelector((state) => state.page.popup);
  const form = useSelector((state) => state.page.form);
  return (
    <ThemeProvider theme={theme}>
      <Box id="app">
        <Header handleNavBarControlClick={handleNavBarControlClick} />
        <Stack direction={"row"}>
          <NavBar ref={navBarRef} />
          <Router />
        </Stack>
      </Box>
      <MyAlert />
      {Object.keys(popup).filter((key) => popup[key] === true).length > 0 && (
        <Popup>
          {popup.isLoading && <Loading />}
          {popup.isFormShow && form}
        </Popup>
      )}
    </ThemeProvider>
  );
}

export default App;
