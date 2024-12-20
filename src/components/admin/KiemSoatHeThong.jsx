import {Card, CardContent, Typography, Button, Slide, Paper, useTheme} from '@mui/material';
import React from "react";

const SystemControl = () => {
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
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
                    Kiểm Soát Hệ Thống
                </Typography>
                <Button variant="contained" color="error">Dừng Hệ Thống</Button>
            </Paper>
        </Slide>
    );
};

export default SystemControl;
