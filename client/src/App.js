import { pink } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers";
import { AuthBox, Footer, Header, MyAlert, Popup } from "./components";

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
  const popup = useSelector((state) => state.page.popup);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routers />
        <Footer />

        {Object.keys(popup).filter((key) => popup[key] === true).length > 0 && (
          <Popup>{popup.auth && <AuthBox />}</Popup>
        )}

        <MyAlert />
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
