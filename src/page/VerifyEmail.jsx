import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const VerifyEmailPage = () => {
    return (
        <Container maxWidth="md" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        }}>
            <LockOpenIcon sx={{ fontSize: 100, color: '#2fff00' }} /> {/* Icon màu cam */}
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#333' }}>
                201 - Thành công
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: '#666', marginBottom: 2 }}>
                Xác thực tài khoản của bạn thành công, bạn có thể bắt đầu sử dụng dịch vụ !!!!
            </Typography>
            <Button component={Link} to="/home" variant="contained" color="primary">
                Quay về trang chủ
            </Button>
        </Container>
    );
};

export default VerifyEmailPage;