import { Avatar, Box, Button, Stack, TextareaAutosize, Typography } from "@mui/material";
import { blue, deepOrange, grey } from "@mui/material/colors";
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';

export default function CommnetBox() {
    return (
        <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                <StyledTextarea minRows={3} placeholder="Leave your comment" />
                <Button>Send</Button>
            </Stack>
            <Box marginY={3}>
                <Stack direction={"row"} spacing={2} alignItems={"center"} marginY={2}>
                    <Avatar sx={{ bgcolor: blue[500] }}>Â</Avatar>
                    <Box>
                        <Typography variant="subtitle2" component={"span"} marginRight={2}>Ân Chu</Typography>
                        <Typography variant="subtitle1" component={"span"} sx={{fontSize:12, color: "#999"}}>Ngày 11 tháng 5 năm 2023</Typography>
                        <Typography variant="body1" marginTop={2}>Super! Congrats on the EC! 👍😊</Typography>
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"} marginY={2}>
                    <Avatar sx={{ bgcolor: blue[500] }}>Â</Avatar>
                    <Box>
                        <Typography variant="subtitle2" component={"span"} marginRight={2}>Ân Chu</Typography>
                        <Typography variant="subtitle1" component={"span"} sx={{fontSize:12, color: "#999"}}>Ngày 11 tháng 5 năm 2023</Typography>
                        <Typography variant="body1" marginTop={2}>Super! Congrats on the EC! 👍😊</Typography>
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"} marginY={2}>
                    <Avatar sx={{ bgcolor: blue[500] }}>Â</Avatar>
                    <Box>
                        <Typography variant="subtitle2" component={"span"} marginRight={2}>Ân Chu</Typography>
                        <Typography variant="subtitle1" component={"span"} sx={{fontSize:12, color: "#999"}}>Ngày 11 tháng 5 năm 2023</Typography>
                        <Typography variant="body1" marginTop={2}>Super! Congrats on the EC! 👍😊</Typography>
                    </Box>
                </Stack>
                
            </Box>
        </Box>
    )
}
const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => {
        const mytheme = useTheme();
        return `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${grey[900]};
        background: '#fff';
        border: 1px solid ${grey[200]};
        box-shadow: 0px 2px 2px ${grey[50]};
        resize: none;
      
        &:hover {
          border-color: ${mytheme.palette.primary[400]};
        }
        &:focus {
            border-color: ${mytheme.palette.primary[400]};
            box-shadow: 0 0 0 3px ${mytheme.palette.primary[200]};
          }
        
          // firefox
          &:focus-visible {
            outline: 0;
          }
        `
    }
);
