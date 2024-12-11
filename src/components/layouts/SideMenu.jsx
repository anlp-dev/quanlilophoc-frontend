import * as React from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import apiConfig from "../../configs/apiConfig.jsx";

const drawerWidth = 270;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const token_decode = jwtDecode(token);
                    const res = await fetch(`${apiConfig.baseUrl}/auth/account/${token_decode.userId}`, {
                        method: 'GET',
                        headers: apiConfig.getAuthHeaders(token)
                    });

                    if (!res.ok) {

                        const errorData = await res.json(); // Hoặc res.text() tùy theo response
                        console.error("Lỗi server:", errorData);

                    }
                    const data = await res.json();
                    setUser(data.data);
                    setIsAuthenticated(true);
                    setRole(data.data.roleId.code)


                } catch (error) {
                    console.error("Lỗi network:", error);
                }
            }
        };

        fetchData();

    }, []);


    return (
        <Drawer
            variant="permanent"
            sx={{
                display: {xs: 'none', md: 'block'},
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: '#E6E6FA',
                },
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto', // Cho phép cuộn nội dung chính
                    height: `calc(100vh - 64px - 64px)`, // Trừ chiều cao header và footer
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#a1a1a1',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
            >
                <Divider/>
                <MenuContent role={role}/>
            </Box>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: '#FFE4E1',
                    color: 'black',
                }}
            >
                <Avatar
                    sizes="small"
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{width: 36, height: 36}}
                />
                <Box sx={{mr: 'auto'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        {user?.fullname}
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {user?.email}
                    </Typography>
                </Box>
                <OptionsMenu/>
            </Stack>
        </Drawer>
    );
}