import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Slide,
    Paper,
    useTheme,
    Switch,
    Divider,
    Grid,
    Container
} from '@mui/material';
import {Save, Lock} from '@mui/icons-material';
import cauHinhHeThongService from '../../services/admin/CauHinhHeThongService.jsx';
import Loading from "../loading/Loading.jsx";
import {notifySuccess, notifyError, notifyInfo} from "../notification/ToastNotification.jsx";


const Settings = () => {
    const [objSetting, setObjSetting] = useState({});
    const [passwordLength, setPasswordLength] = useState(0); // Default password length
    const [isPasswordRecoveryEnabled, setIsPasswordRecoveryEnabled] = useState(false); // Default disabled
    const [requireSpecialChar, setRequireSpecialChar] = useState(false); // Require special character
    const [requireNumber, setRequireNumber] = useState(false); // Require number
    const [requireUppercase, setRequireUppercase] = useState(false); // Require uppercase
    const [loading, isLoading] = useState(false);
    const theme = useTheme();

    useEffect( () => {
        try{
            if (objSetting) {
                setPasswordLength(objSetting.lengthPass || 0);
                setRequireNumber(objSetting.numbersCharacters || false);
                setRequireSpecialChar(objSetting.specialCharacters || false);
                setRequireUppercase(objSetting.upperCaseCharacters || false);
            }
            fetchData()
        }catch (e) {
            throw new Error(e)
        }
    }, []);

    const fetchData = async () => {
        isLoading(true)
        try{
            const result = await cauHinhHeThongService.get();
            const data = result?.data;
            data.map((d) => {
                setObjSetting(d)
                setPasswordLength(d?.lengthPass);
                setRequireNumber(d?.numbersCharacters);
                setRequireUppercase(d?.upperCaseCharacters);
                setRequireSpecialChar(d?.specialCharacters);
            })

        }catch (e) {
            throw new Error(e);
        }finally {
            isLoading(false)
        }
    }

    const handlePasswordLengthChange = (event) => {
        const newPasswordLength = event.target.value;
        if (newPasswordLength >= 8 && newPasswordLength <= 16) {
            setPasswordLength(newPasswordLength);
        }
    };

    const handleSubmit = async () => {
        isLoading(true);
        try{
            const data = {
                id: objSetting._id,
                lengthPass: passwordLength,
                specialCharacters: requireSpecialChar,
                numbersCharacters: requireNumber,
                upperCaseCharacters: requireUppercase
            }
            await cauHinhHeThongService.update(data);
            notifySuccess("Lưu cấu hình thành công !!!")
        }catch (e) {
            notifyError(`Lỗi: ${e.message}`);
        }finally {
            fetchData();
            isLoading(false)
        }
    };

    return (
        <Slide direction="up" in>
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    mt: 1,
                    width: '100%',
                    height: '98vh',
                    maxWidth: 1550,
                    borderRadius: 4,
                    boxShadow: theme.shadows[6],
                    mx: 'auto',
                }}
            >
                {loading ? <Loading/> : ""}
                <Typography variant="h4" fontWeight="bold" gutterBottom align="center"
                            color={theme.palette.primary.main}>
                    Cấu hình đăng nhập, đăng kí
                </Typography>
                <Divider sx={{mb: 4}}/>
                <Box sx={{
                    p: 4,
                    mt: 1,
                    width: '100%',
                    maxWidth: 1200,
                    borderRadius: 4,
                    boxShadow: theme.shadows[6],
                    mx: 'auto',
                }}>
                    <Container>
                        <Grid container spacing={4}>
                            {/* Password Length Configuration */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Độ dài mật khẩu"
                                    type="number"
                                    value={passwordLength}
                                    onChange={handlePasswordLengthChange}
                                    fullWidth
                                    sx={{mb: 2}}
                                    inputProps={{min: 8, max: 16}}
                                />
                            </Grid>

                            {/* Enable Password Recovery */}
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isPasswordRecoveryEnabled}
                                            onChange={(e) => setIsPasswordRecoveryEnabled(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Lấy lại mật khẩu qua email"
                                    sx={{mb: 2}}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="h6" fontWeight="bold" gutterBottom color="text.secondary">
                                    Cấu hình bảo mật
                                </Typography>
                            </Grid>

                            {/* Require Special Character */}
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={requireSpecialChar}
                                            onChange={(e) => setRequireSpecialChar(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Bắt buộc phải có kí đặc biệt"
                                />
                            </Grid>

                            {/* Require Number */}
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={requireNumber}
                                            onChange={(e) => setRequireNumber(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Bắt buộc phải có số"
                                />
                            </Grid>

                            {/* Require Uppercase */}
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={requireUppercase}
                                            onChange={(e) => setRequireUppercase(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Bắt buộc phải có kí tự in hoa"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{my: 2}}/>
                            </Grid>

                            {/* Update Button */}
                            <Grid item xs={12} align="center">
                                <Button onClick={handleSubmit} fullWidth>
                                    <Save/> Cập nhật thay đổi
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Paper>
        </Slide>
    );
};

export default Settings;
