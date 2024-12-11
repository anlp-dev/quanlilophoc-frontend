import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import PageTransition from '../../enums/effect/PageTransition';

const Settings = () => {
    const [passwordLength, setPasswordLength] = useState(8); // Mặc định độ dài mật khẩu là 8
    const [isPasswordRecoveryEnabled, setIsPasswordRecoveryEnabled] = useState(false); // Mặc định là không cho phép khôi phục mật khẩu qua email

    const handlePasswordLengthChange = (event) => {
        const newPasswordLength = event.target.value;
        if (newPasswordLength >= 8 && newPasswordLength <= 16) {
            setPasswordLength(newPasswordLength);
        }
    };

    const handlePasswordRecoveryChange = (event) => {
        setIsPasswordRecoveryEnabled(event.target.checked);
    };

    const handleSubmit = () => {
        // Xử lý lưu các thay đổi cấu hình tại đây
        console.log(`Độ dài mật khẩu: ${passwordLength}`);
        console.log(`Cho phép khôi phục mật khẩu qua email: ${isPasswordRecoveryEnabled ? 'Có' : 'Không'}`);
    };

    return (
        <PageTransition>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Cấu hình hệ thống
                </Typography>

                {/* Cấu hình độ dài mật khẩu */}
                <TextField
                    label="Độ dài mật khẩu tối thiểu"
                    type="number"
                    value={passwordLength}
                    onChange={handlePasswordLengthChange}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    inputProps={{ min: 8, max: 16 }}
                />

                {/* Cấu hình cho phép khôi phục mật khẩu qua email */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPasswordRecoveryEnabled}
                            onChange={handlePasswordRecoveryChange}
                            color="primary"
                        />
                    }
                    label="Cho phép khôi phục mật khẩu qua email"
                    sx={{ marginBottom: 2 }}
                />

                {/* Nút cập nhật cấu hình */}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Cập nhật
                </Button>
            </Box>
        </PageTransition>
    );
};

export default Settings;
