import {Card, CardContent, Typography, Button, Grid, Box, Divider, Slide, Paper, useTheme} from '@mui/material';
import { AddCircle, Edit } from '@mui/icons-material';
import React from "react";

const RoleManagement = () => {
    const theme = useTheme();
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
                    Quản trị Vai Trò
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Quản lý các vai trò và quyền hạn của người dùng trong hệ thống. Chọn một trong các tùy chọn bên dưới để thêm hoặc chỉnh sửa vai trò.
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    {/* Thêm Vai Trò Button */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#2e3b55',
                                },
                            }}
                            startIcon={<AddCircle />}
                        >
                            Thêm Vai Trò
                        </Button>
                    </Grid>

                    {/* Sửa Vai Trò Button */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f50057',
                                },
                            }}
                            startIcon={<Edit />}
                        >
                            Sửa Vai Trò
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Slide>
    );
};

export default RoleManagement;
