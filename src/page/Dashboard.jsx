import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
    const stats = [
        { title: "Lớp Học", value: 12, color: "#2196F3" },
        { title: "Giáo Viên", value: 5, color: "#4CAF50" },
        { title: "Học Sinh", value: 120, color: "#FF9800" },
        { title: "Bài Tập", value: 35, color: "#F44336" },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ bgcolor: stat.color, color: "#fff" }}>
                            <CardContent>
                                <Typography variant="h5">{stat.value}</Typography>
                                <Typography>{stat.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
