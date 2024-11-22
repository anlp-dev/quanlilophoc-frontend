import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CssBaseline
} from '@mui/material';
import { motion } from "framer-motion";

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // Màu xanh dương
        },
        secondary: {
            main: '#4caf50', // Màu xanh lá cây
        },
    },
});

function Home() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Reset CSS mặc định */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Trang chủ
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
                {/* Thêm margin-top và padding-x */}
                <Grid item xs={12}>
                    {/* Nội dung chính */}
                    <Grid container spacing={3}> {/* Tăng spacing */}
                        <Grid item xs={12} md={6}>
                            {/* Thông báo */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.02 }} // Thêm hover effect
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {/* Thay đổi variant */}
                                            Thông báo
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Nội dung thông báo...
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">
                                            Xem thêm
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                        {/* Các phần khác */}
                        <Grid item xs={12} md={6}>
                            {/* Lịch học */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lịch học
                                        </Typography>
                                        {/* Hiển thị lịch học */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">Xem chi tiết</Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Bài tập */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Bài tập
                                        </Typography>
                                        {/* Hiển thị danh sách bài tập */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">Xem tất cả</Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Thống kê */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Thống kê
                                        </Typography>
                                        {/* Hiển thị biểu đồ thống kê */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">Xem chi tiết</Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Home;