import React from "react";
import {
    Box,
    CssBaseline,
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    AppBar
} from "@mui/material";
import SideMenu from "../components/layouts/SideMenu.jsx";
import {Outlet} from "react-router-dom";

const drawerWidth = 240;

const Main = () => {
    return (
        <Box sx={{backgroundColor: "#DCDCDC", height: "100vh"}}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                {/* App Bar */}
                <SideMenu/>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    );
}

export default Main;