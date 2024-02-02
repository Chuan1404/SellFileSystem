import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Tab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import OAuth2Form from "./OAuth2Form";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthBox() {
    const theme = useTheme();

    const [tabIndex, setTabIndex] = useState("0");
    const handleTabIndex = (e, value) => {
        setTabIndex(value)
    }
    return (
        <Box className="authbox" width={"100%"} maxWidth={350} borderRadius={2} overflow={'hidden'}>
            <Box className="authbox__header" bgcolor={theme.palette.secondary.main} padding={1}>
                <Typography align="center" variant="h6" color={"#fff"}>Welcome to our website, please log in to continue</Typography>
            </Box>
            <TabContext value={tabIndex}>
                <Box className="authbox__accordion" bgcolor={"#fff"} paddingX={5} paddingBottom={2}>
                    <TabList onChange={handleTabIndex} variant="fullWidth" >
                        <Tab label="Sign in" value="0" />
                        <Tab label="Sign up" value="1" />
                    </TabList>
                    <OAuth2Form paddingX={3} marginY={1} />

                    <Divider>
                        <Typography variant="subtitle2">or</Typography>
                    </Divider>
                    <TabPanel value="0" sx={{ p: 0 }}>
                        <SignInForm />
                    </TabPanel>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <SignUpForm />
                    </TabPanel>
                </Box>

            </TabContext>
        </Box>
    )
}