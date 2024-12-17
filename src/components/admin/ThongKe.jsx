import React, {useEffect, useState} from 'react';
import {Box, Typography, Grid, Card, CardContent, Slide, Paper, useTheme} from '@mui/material';
import {PieChart, BarChart, AccountCircle, Class as ClassIcon, RequestQuote} from '@mui/icons-material';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import PageTransition from '../../enums/effect/PageTransition';

// Giả sử bạn có API trả về dữ liệu thống kê người dùng, lớp học, và request
const fetchStats = async () => {
    // Tạo dữ liệu giả lập
    return {
        users: 150,
        classes: 45,
        requests: 1020,
        userData: [
            {date: '2024-01-01', count: 10},
            {date: '2024-01-02', count: 15},
            {date: '2024-01-03', count: 20},
        ],
        classData: [
            {date: '2024-01-01', count: 5},
            {date: '2024-01-02', count: 10},
            {date: '2024-01-03', count: 15},
        ],
    };
};

const Dashboard = () => {
    const [userStats, setUserStats] = useState({users: 0, classes: 0, requests: 0});
    const [userData, setUserData] = useState([]);
    const [classData, setClassData] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const getStats = async () => {
            const stats = await fetchStats();
            setUserStats({users: stats.users, classes: stats.classes, requests: stats.requests});
            setUserData(stats.userData);
            setClassData(stats.classData);
        };

        getStats();
    }, []);

    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 3,
                    width: '100%',
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="#3f51b5" gutterBottom>
                    Thống kê
                </Typography>
                <Box sx={{padding: 3}}>
                    <Grid container spacing={3}>
                        {/* Thống kê người dùng */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Card sx={{backgroundColor: '#f0f0f0'}}>
                                <CardContent>
                                    <AccountCircle sx={{fontSize: 50, color: '#3f51b5'}}/>
                                    <Typography variant="h6">Người dùng</Typography>
                                    <Typography variant="body1">{userStats.users} Người dùng</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Thống kê lớp học */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Card sx={{backgroundColor: '#f0f0f0'}}>
                                <CardContent>
                                    <ClassIcon sx={{fontSize: 50, color: '#3f51b5'}}/>
                                    <Typography variant="h6">Lớp học</Typography>
                                    <Typography variant="body1">{userStats.classes} Lớp học</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Thống kê request */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Card sx={{backgroundColor: '#f0f0f0'}}>
                                <CardContent>
                                    <RequestQuote sx={{fontSize: 50, color: '#3f51b5'}}/>
                                    <Typography variant="h6">Request</Typography>
                                    <Typography variant="body1">{userStats.requests} Request</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{marginTop: 3}}>
                        {/* Biểu đồ người dùng */}
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{marginBottom: 2}}>Thống kê người dùng</Typography>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={userData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="date"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Line type="monotone" dataKey="count" stroke="#8884d8"/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Biểu đồ lớp học */}
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{marginBottom: 2}}>Thống kê lớp học</Typography>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={classData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="date"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Line type="monotone" dataKey="count" stroke="#82ca9d"/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Slide>
    );
};

export default Dashboard;
