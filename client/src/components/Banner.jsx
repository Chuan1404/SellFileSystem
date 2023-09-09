import { Box, Typography } from "@mui/material";
import myImage from '../assets/images/10.jpg';

export default function Banner({image, title="Welcome to our website", ...props}) {

    // onclick => isLoading = true
    return (
        <Box className="banner" sx={{ height: 500}} bgcolor="secondary">
            <Typography className="position-center" variant="h1" color={"#fff"}>{title}</Typography>
            <img className="position-center" src={image? image: myImage} alt="" />
        </Box>
    );
}