import {
  Box,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Home, Camera, VideoCall } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";

export default function TypeTags() {
  const [value, setValue] = useState("home");

  return (
    <Box className="typeTags flex-center" py={3}>
      <ToggleButtonGroup>
        <ToggleButton
          value="home"
          selected={value == "home"}
          onClick={() => setValue("home")}
          sx={{ px: 4 }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Home />
            <Typography>Home</Typography>
          </Stack>
        </ToggleButton>

        <ToggleButton
          value="image"
          selected={value == "image"}
          onClick={() => setValue("image")}
          sx={{ px: 4 }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Camera />
            <Typography>Ảnh</Typography>
          </Stack>
        </ToggleButton>
        <ToggleButton
          value="illustration"
          selected={value == "illustration"}
          onClick={() => setValue("illustration")}
          sx={{ px: 4 }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <VideoCall />
            <Typography>Video</Typography>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

const ToggleButton = styled(MuiToggleButton)(() => {
    const theme = useTheme();
    return ({
        "&.Mui-selected, &.Mui-selected:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white"
        }
      })
});