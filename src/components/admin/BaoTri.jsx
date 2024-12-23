import {Card, CardContent, Typography, Button, Slide, Paper, useTheme} from '@mui/material';
import React from "react";

const Maintenance = () => {
    const theme = useTheme();
    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 1,
                    height: "98vh",
                    width: '100%',
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
                    Bảo Trì
                </Typography>
                <Button variant="contained" color="error">Bắt Đầu Bảo Trì</Button>
            </Paper>
        </Slide>
    );
};

export default Maintenance;
