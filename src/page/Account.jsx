import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Alert,
    Snackbar,
    CircularProgress,
    Avatar,
    Grid,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
// import userService from './userService'; // Thay thế bằng đường dẫn đến userService của bạn

// Mock userService (thay thế bằng service thật của bạn)
const userService = {
    changePassword: async () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() < 0.5 ? resolve() : reject(new Error('Lỗi đổi mật khẩu'));
            }, 1000);
        }),
    updateTwoFactorAuth: async () =>
        new Promise((resolve) => {
            setTimeout(resolve, 1000);
        }),
};

const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: 500,
    margin: '3rem auto',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: theme.spacing(3),
    '&:hover': {
        backgroundColor: '#1976D2',
    },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

function Account() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleTwoFactorAuthChange = (event) => {
        setTwoFactorAuth(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        setIsLoading(true);

        try {
            await userService.changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            await userService.updateTwoFactorAuth(twoFactorAuth);

            setSuccessMessage('Cập nhật tài khoản thành công!');
            setErrorMessage(null);

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setErrorMessage(error.message || 'Cập nhật tài khoản thất bại.');
            setSuccessMessage(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ContentBox>
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 80,
                        height: 80,
                        marginBottom: '1rem',
                    }}
                >
                    <Person />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    Tài khoản của tôi
                </Typography>

                {errorMessage && (
                    <Snackbar
                        open={!!errorMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                )}

                {successMessage && (
                    <Snackbar
                        open={!!successMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                            {successMessage}
                        </Alert>
                    </Snackbar>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <StyledFormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="current-password">Mật khẩu hiện tại</InputLabel>
                        <OutlinedInput
                            id="current-password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowCurrentPassword}
                                        edge="end"
                                    >
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu hiện tại"
                        />
                    </StyledFormControl>

                    <StyledFormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
                        <OutlinedInput
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu mới"
                        />
                    </StyledFormControl>

                    <StyledFormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="confirm-password">Xác nhận mật khẩu</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Xác nhận mật khẩu"
                        />
                    </StyledFormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={twoFactorAuth}
                                onChange={handleTwoFactorAuthChange}
                                name="twoFactorAuth"
                                color="primary"
                            />
                        }
                        label="Xác thực hai yếu tố"
                    />

                    <StyledButton type="submit" fullWidth disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Lưu thay đổi'}
                    </StyledButton>
                </Box>
            </ContentBox>
        </motion.div>
    );
}

export default Account;