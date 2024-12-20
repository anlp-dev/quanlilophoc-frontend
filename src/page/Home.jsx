import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CssBaseline,
    Box,
    IconButton, Slide, Paper, useTheme,
} from '@mui/material';
import {motion} from "framer-motion";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useEffect, useState} from "react";
import userService from '../services/UserService.jsx'
import WorkIcon from '@mui/icons-material/Work';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ClassIcon from '@mui/icons-material/Class';
import {Role} from "../enums/Role.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Gradient xanh tím
        },
        secondary: {
            main: '#ff9800', // Gradient cam
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial',
    },
});

function Home() {
    const [user, setUser] = useState({});
    const [role, setRole] = useState('')
    const theme = useTheme();
    useEffect(() => {
        document.title = 'Quản lí lớp học';
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res_data = await userService.loadDataUser(token);
            setRole(res_data.data.roleId);
            setUser(res_data.data);
        }
        fetchData();
    }, []);

    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 1,
                    width: '100%',
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Trang chủ
                </Typography>
                <Grid container spacing={4} sx={{mt: 0, px: 4}}>
                    <Grid item xs={12} md={6} lg={3}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.6}}
                            whileHover={{scale: 1.05}}
                        >
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Box
                                    sx={{
                                        background: 'linear-gradient(#7FFFD4,  #AFEEEE, #E0FFFF)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        py: 3,
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                >
                                    <NotificationsActiveIcon sx={{fontSize: 50}}/>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="div" align="center">
                                        Thông báo
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Nội dung các thông báo quan trọng...
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small" variant="contained" color="primary">
                                        Xem thêm
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.6}}
                            whileHover={{scale: 1.05}}
                        >
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Box
                                    sx={{
                                        background: 'linear-gradient(#FFDEAD,  #F0E68C, #FFFFF0)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        py: 3,
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                >
                                    <WorkIcon sx={{fontSize: 50}}/>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="div" align="center">
                                        Việc cần làm
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Những việc được giao trong ngày hôm nay
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small" variant="contained" color="primary">
                                        Xem thêm
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.6}}
                            whileHover={{scale: 1.05}}
                        >
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Box
                                    sx={{
                                        background: 'linear-gradient( #FFC0CB, #EE82EE, #FFF0F5)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        py: 3,
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                >
                                    <TextSnippetIcon sx={{fontSize: 50}}/>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="div" align="center">
                                        Bài tập
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Những bài tập được giao trong ngày hôm nay
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small" variant="contained" color="primary">
                                        Xem thêm
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.6}}
                            whileHover={{scale: 1.05}}
                        >
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Box
                                    sx={{
                                        background: 'linear-gradient( #D3D3D3, #F5F5F5, #E6E6FA)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        py: 3,
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                >
                                    <ClassIcon sx={{fontSize: 50}}/>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="div" align="center">
                                        Lớp học
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Những lớp học bạn đang tham gia
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small" variant="contained" color="primary">
                                        Xem thêm
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} hidden={role.code !== Role.ADMIN}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.6}}
                            whileHover={{scale: 1.05}}
                        >
                            <Card sx={{boxShadow: 5, borderRadius: 3}}>
                                <Box
                                    sx={{
                                        background: 'linear-gradient(  #F08080, #CD5C5C, #FFB6C1)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        py: 3,
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                >
                                    <TextSnippetIcon sx={{fontSize: 50}}/>
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" component="div" align="center">
                                        Quản lí tài khoản
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Quản lí hệ thống bởi người quản trị
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small" variant="contained" color="primary">
                                        Xem thêm
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>
            </Paper>
        </Slide>
    );
}

export default Home;
