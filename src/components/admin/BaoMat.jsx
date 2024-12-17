import React from 'react';
import {Box, Typography, Switch, Slide, Paper, useTheme} from '@mui/material';
import PageTransition from '../../enums/effect/PageTransition';

const Security = () => {
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
                <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
                    Bảo mật
                </Typography>
                <Box sx={{padding: 3}}>
                    <Typography variant="body1">Kích hoạt xác thực hai yếu tố</Typography>
                    <Switch defaultChecked color="primary"/>
                </Box>
            </Paper>
        </Slide>
    );
};

export default Security;
