import React from "react";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {/* Thống kê tổng quan */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Thống kê tổng quan
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                                    <Typography variant="h5">10</Typography>
                                    <Typography variant="body2">Giáo viên</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                                    <Typography variant="h5">200</Typography>
                                    <Typography variant="body2">Học sinh</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                                    <Typography variant="h5">15</Typography>
                                    <Typography variant="body2">Lớp học</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                                    <Typography variant="h5">30</Typography>
                                    <Typography variant="body2">Bài tập</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Lịch học hôm nay */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Lịch học hôm nay
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="09:00 AM - Toán lớp 10A" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="11:00 AM - Hóa học lớp 10B" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="02:00 PM - Vật lý lớp 10C" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Thông báo gần đây */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Thông báo gần đây
                        </Typography>
                        <Divider />
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Học sinh A vừa đăng ký lớp Toán 10A" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Giáo viên B vừa tạo bài tập mới cho lớp 10B" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Hạn nộp bài kiểm tra tuần tới là ngày 25/11" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
