import React from 'react';
import { Box, Typography, Switch } from '@mui/material';
import PageTransition from '../../enums/effect/PageTransition';

const Security = () => {
    return (
        <PageTransition>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Bảo mật
                </Typography>
                <Typography variant="body1">Kích hoạt xác thực hai yếu tố</Typography>
                <Switch defaultChecked color="primary" />
            </Box>
        </PageTransition>
    );
};

export default Security;
