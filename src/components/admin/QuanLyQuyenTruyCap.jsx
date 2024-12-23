import {Card, CardContent, Typography, Grid, Button, Slide, Paper, useTheme} from '@mui/material';
import React from "react";

const AccessControl = () => {
    const theme = useTheme();
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
                <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
                    Quản Lí Quyền Truy Cập
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" fullWidth>Quản lý Quyền</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="error" fullWidth>Gỡ Quyền</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Slide>
    );
};

export default AccessControl;
