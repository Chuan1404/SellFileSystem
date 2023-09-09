import { FileDownload } from "@mui/icons-material";
import { Box, Button, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';


export default function DownloadBox() {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    return (
        <Box position={"relative"}>
            <Button
                variant="contained"
                fullWidth
                startIcon={<FileDownload />}
                onClick={() => setIsOpen(!isOpen)}
            >
                Download
            </Button>

            <Box sx={{ display: isOpen ? "block" : "none" }} position={"absolute"} top={"100%"} left={0} right={0}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="small"
                    name="radio-buttons-group"
                    sx={{ background: `${theme.palette.secondary.main}`, color: "#fff", p: 2 }}
                >
                    <table>
                        <tr>
                            <td><FormControlLabel value="small" control={<StyledRadio />} label="640x247" /></td>
                            <td><Typography variant="subtitle1">JPG</Typography></td>
                            <td><Typography variant="subtitle1">234kb</Typography></td>
                        </tr>
                        <tr>
                            <td><FormControlLabel value="medium" control={<StyledRadio />} label="1280x853" /></td>
                            <td><Typography variant="subtitle1">JPG</Typography></td>
                            <td><Typography variant="subtitle1">234kb</Typography></td>
                        </tr>
                        <tr>
                            <td><FormControlLabel value="large" control={<StyledRadio />} label="1920x1279" /></td>
                            <td><Typography variant="subtitle1">JPG</Typography></td>
                            <td><Typography variant="subtitle1">234kb</Typography></td>
                        </tr>
                    </table>
                    <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                        <Button variant="contained">Xác nhận</Button>
                        <Button color="secondary" variant="contained"
                            onClick={() => setIsOpen(false)}>Hủy</Button>
                    </Stack>


                </RadioGroup>
            </Box>


        </Box>
    )
}
const StyledRadio = styled(Radio)(() => {
    const theme = useTheme();

    return ({
        '&.MuiRadio-root': {
            color: "#fff", // đổi màu khi chưa được chọn
        },
        '&.Mui-checked': {
            color:  theme.palette.primary.main, // đổi màu khi chưa được chọn
        }
    })
});