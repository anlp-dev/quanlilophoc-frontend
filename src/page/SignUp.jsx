import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {keyframes, styled} from '@mui/material/styles';
import ForgotPassword from '../components/login-signin/ForgotPassword.jsx';
import {GoogleIcon, FacebookIcon} from '../components/login-signin/CustomIcon.jsx';
import Snackbar from "@mui/material/Snackbar";
import ReactLoading from "react-loading";
import {FormHelperText, Input, InputLabel, MenuItem, Select} from "@mui/material";
import Grid from '@mui/material/Grid';

import authService from "../services/authService.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const fadeIn = keyframes(`from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }`)


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    animation: `${fadeIn} 0.5s ease-in-out`,
    [theme.breakpoints.up('sm')]: {
        maxWidth: '600px',
    },
    borderRadius: '30px',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    background: '#f0f2f5',
    backgroundImage: `
    linear-gradient(to bottom, #f0f2f5, #e0e2e5), // Gradient nền
    radial-gradient(circle at 10% 20%, rgba(148,187,233,0.5) 10px, transparent 20px), // Bong bóng 1
    radial-gradient(circle at 80% 30%, rgba(255,215,0,0.5) 15px, transparent 30px), // Bong bóng 2
    radial-gradient(circle at 30% 70%, rgba(75,0,130,0.5) 8px, transparent 16px) // Bong bóng 3
  `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),

    },
    '&::after': { // Thêm &::after để tạo layer cho bong bóng
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        background: 'transparent', // Nền trong suốt
        backgroundImage: `
      radial-gradient(circle at 20% 10%, rgba(255,165,0,0.5) 15px, transparent 30px),
      radial-gradient(circle at 70% 40%, rgba(0,128,0,0.5) 10px, transparent 20px),
      radial-gradient(circle at 50% 80%, rgba(138,43,226,0.5) 8px, transparent 16px)
    `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
}));

const SignUp = () => {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [roleErrorMessage, setRoleErrorMessage] = React.useState('');
    const [roleError, setRoleError] = React.useState(false);
    const [userNameError, setUserNameError] = React.useState(false);
    const [uNameErrorMess, setUNameMess] = React.useState('');
    const [rePassErr, setRePassErr] = React.useState(false);
    const [rePassErrMess, setRePassErrMess] = React.useState('')
    const [openNotification, setOpenNotification] = React.useState(false);
    const [messNotification, setMessNotification] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    const [role, setRole] = React.useState([]);
    const [roleSelect, setRoleSelect] = React.useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenNotification(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res_data = await fetch('http://127.0.0.1:9999/role/');
                const data = await res_data.json();
                setRole(data.data);
            } catch (e) {

            }
        }

        fetchData();
    }, []);


    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');
        const repassword = document.getElementById('repassword');
        const username = document.getElementById('username');
        const roleSe = document.getElementById('roleSe');
        let isValid = true;


        // if(!roleSe.value){
        //     setRoleErrorMessage('Không được để trống phần này');
        //     setRoleError(true);
        //     isValid = false;
        // }else{
        //     setRoleErrorMessage('');
        //     setRoleError(false);
        // }

        if (!username.value) {
            setUserNameError(true);
            setUNameMess('Tên đăng nhập không được để trống !')
            isValid = false;
        } else {
            setUserNameError(false)
            setUNameMess('')
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }


        if (!password.value || password.value.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Mật khẩu phải lớn hơn 8 kí tự !');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        if (!repassword?.value) {
            setRePassErr(true);
            setRePassErrMess('Mật khẩu nhập lại không được để trống!');
            isValid = false;
        } else if (repassword?.value !== password?.value) {
            setRePassErr(true);
            setRePassErrMess('Mật khẩu nhập lại không chính xác !');
            isValid = false;
        } else {
            setRePassErr(false);
            setRePassErrMess(' ');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nameError || emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        try {
            const res_signin = await authService.signup(data);
            if (res_signin) {
                setOpenNotification(true)
                setMessNotification('Đăng ký thành công!');
                setIsLoading(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (e) {
            setOpenNotification(true)
            setMessNotification(e.message)
        }


    };
    return (
        <>
            <CssBaseline enableColorScheme/>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    {isLoading && (
                        <Box
                            sx={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
                                zIndex: 1000, // Đảm bảo loading hiển thị trên cùng
                            }}
                        >
                            {/*<CircularProgress size={40}/>*/}
                            <ReactLoading type="bars" color="#fff" height={100} width={100}/>
                        </Box>
                    )}
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={openNotification}
                        onClose={handleClose}
                        message={messNotification}
                        autoHideDuration={3000}
                    />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center',}}
                    >
                        Đăng ký tài khoản
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}> {/* Cột 1 chiếm 1/4 chiều rộng */}
                                <Box> {/* Sử dụng Box để nhóm các FormControl */}
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <TextField
                                            label="Tên đăng nhập"
                                            autoComplete="username"
                                            name="username"
                                            required
                                            fullWidth
                                            id="username"
                                            placeholder="Tên đăng nhập"
                                            error={userNameError}
                                            helperText={uNameErrorMess}
                                            color={userNameError ? 'error' : 'primary'}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email"
                                            id="email"
                                            placeholder="your@email.com"
                                            name="email"
                                            autoComplete="email"
                                            variant="outlined"
                                            error={emailError}
                                            helperText={emailErrorMessage}
                                            color={emailError ? 'error' : 'primary'}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Mật khẩu"
                                            name="password"
                                            placeholder="••••••"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            variant="outlined"
                                            error={passwordError}
                                            helperText={passwordErrorMessage}
                                            color={passwordError ? 'error' : 'primary'}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <TextField
                                            autoComplete="name"
                                            label="Họ và tên"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            placeholder="Nguyen Van A"
                                            error={nameError}
                                            helperText={nameErrorMessage}
                                            color={nameError ? 'error' : 'primary'}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <InputLabel id="roleId">Bạn là</InputLabel>
                                        <Select
                                            label="Bạn là"
                                            id="roleId"
                                            name="roleId"
                                            value={roleSelect}
                                            error={roleError}
                                            color={roleError ? 'error' : 'primary'}
                                            onChange={(e) => setRoleSelect(e.target.value)}
                                        >
                                            {role.map(r => (
                                                <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {roleError && (
                                            <FormHelperText error={roleError}>
                                                {roleErrorMessage}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth sx={{marginBottom: 3}}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Nhập lại mật khẩu"
                                            name="repassword"
                                            placeholder="••••••"
                                            type="password"
                                            id="repassword"
                                            autoComplete="new-password"
                                            variant="outlined"
                                            error={rePassErr}
                                            helperText={rePassErrMess}
                                            color={rePassErr ? 'error' : 'primary'}
                                        />
                                    </FormControl>

                                </Box>
                            </Grid>
                        </Grid>

                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary"/>}
                            label="I want to receive updates via email."
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign up
                        </Button>

                    </Box>


                    <Divider>
                        <Typography sx={{color: 'text.secondary'}}>or</Typography>
                    </Divider>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<GoogleIcon/>}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<FacebookIcon/>}
                        >
                            Sign up with Facebook
                        </Button>
                        <Typography sx={{textAlign: 'center'}}>
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{alignSelf: 'center'}}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    )
}

export default SignUp;