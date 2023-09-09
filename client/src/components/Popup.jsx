import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { closePopup } from "../store/slices/pageSlice";

export default function Popup({ children }) {
    const dispatcher = useDispatch();

    const handleClose = () => {
        dispatcher(closePopup());
    }
    return (
        <Box className="popup">
            <Box className="popup__content">
                {children}
                <Box className="popup__close">
                    <IconButton color="white" onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>

        </Box>
    )
}