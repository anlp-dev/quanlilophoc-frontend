// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {Box} from '@mui/system';
import {jwtDecode} from 'jwt-decode'
import apiConfig from "../../configs/apiConfig.jsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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


                } catch (error) {
                    console.error("Lỗi network:", error);
                }
            }
        };

        fetchData();

    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    }



    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" component="div">
                    Courses
                </Typography>
                <Box sx={{display: 'flex', gap: 2}}>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Courses</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Blog</Button>
                    <Button color="inherit">Contact</Button>
                </Box>
                <Box>
                    {isAuthenticated ? (
                        // Hiển thị nội dung khi đã đăng nhập
                        <div>
                            <Typography>Xin chào, {user?.fullname}</Typography>
                            <Button color="inherit" onClick={() => handleLogout()}>Đăng xuất</Button>
                        </div>
                    ) : (
                        // Hiển thị nội dung khi chưa đăng nhập
                        <>
                            <Button variant="contained" color="warning" sx={{mr: 2}}>
                                Join
                            </Button>
                            <Button variant="outlined" color="inherit">
                                Log In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
