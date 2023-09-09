import { Box, Chip, Stack } from "@mui/material";

export default function Tags() {
    let array = [];
    for(let i = 0; i < 100; i++) {
        array.push("Number " + i)
    }
    return (
        <Box>
            {array.map((item, index) => <Chip key={index} sx={{marginRight: 1, marginBottom: 1}}
            label={item}
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
        />)}
        </Box>
    )
}