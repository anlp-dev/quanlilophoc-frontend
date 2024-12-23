import React from "react";
import {Box, Grid, Card, CardContent, Typography, Slide, Paper, useTheme} from "@mui/material";

const Dashboard = () => {
    const theme = useTheme();
    const stats = [
        {title: "Lớp Học", value: 12, color: "#2196F3"},
        {title: "Giáo Viên", value: 5, color: "#4CAF50"},
        {title: "Học Sinh", value: 120, color: "#FF9800"},
        {title: "Bài Tập", value: 35, color: "#F44336"},
    ];

    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 1,
                    width: '100%',
                    height: "98vh",
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Thống kê
                </Typography>
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{bgcolor: stat.color, color: "#fff"}}>
                                <CardContent>
                                    <Typography variant="h5">{stat.value}</Typography>
                                    <Typography>{stat.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Slide>
    );
};

export default Dashboard;
