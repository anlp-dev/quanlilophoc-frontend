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
import authService from "../services/AuthService.jsx";
import {useNavigate} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import {CircularProgress} from "@mui/material";
import ReactLoading from 'react-loading';
import {Message} from '../enums/Message.jsx'
import Loading from "../components/loading/Loading.jsx";
import Notification from "../components/notification/Notification.jsx";
import {notifySuccess, notifyError, notifyInfo} from "../components/notification/ToastNotification.jsx";

const fadeIn = keyframes(`from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }`)

const sparkle = keyframes(`0% {
        opacity: 0;
        transform: translate(0, 0);
    }
    50% {
        opacity: 1;
        transform: translate(5px, -10px);
}
    100% {
        opacity: 0;
        transform: translate(10px, -20px);
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
        maxWidth: '450px',
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
}));

const Login = () => {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [userNameError, setUserNameError] = React.useState(false);
    const [userNameErrorMess, setUserNameErrorMess] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        try {
            const res_login = await authService.login(data);
            console.log(res_login)
            if (res_login.status === 400) {
                throw new Error(res_login.message);
            }
            if(res_login.status === 200) {
                localStorage.setItem('token', res_login?.token);
                document.title = 'Đợi một chút ...'
                notifySuccess(Message.LOGIN_SUCCESS);
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate("/home");
                }, 500)
            }
        } catch (e) {
            notifyError(e.message)
            console.log(e.message)
        }
    };

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const username = document.getElementById('username')

        let isValid = true;

        // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        //     setEmailError(true);
        //     setEmailErrorMessage('Please enter a valid email address.');
        //     isValid = false;
        // } else {
        //     setEmailError(false);
        //     setEmailErrorMessage('');
        // }

        if (!username.value) {
            setUserNameError(true);
            setUserNameErrorMess('Tên đăng nhập không được để trống !');
            isValid = false;
        } else {
            setUserNameError(false);
            setUserNameErrorMess('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage('Mật khẩu không được để trống !');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };
    return (
        <>
            <CssBaseline enableColorScheme/>
            <SignInContainer direction="column" justifyContent="space-between">
                {isLoading &&
                    <>
                        <Loading/>
                    </>}
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center',}}
                    >
                        Đăng nhập
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <TextField
                                error={userNameError}
                                helperText={userNameErrorMess}
                                label="Tên đăng nhập"
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={userNameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                label="Mật khẩu"
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <ForgotPassword open={open} handleClose={handleClose}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Đăng nhập
                        </Button>
                        <Link
                            component="button"
                            type="button"
                            onClick={handleClickOpen}
                            variant="body2"
                            sx={{alignSelf: 'center'}}
                        >
                            Quên mật khẩu
                        </Link>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Google')}
                            startIcon={<GoogleIcon/>}
                        >
                            Đăng nhập bằng Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Facebook')}
                            startIcon={<FacebookIcon/>}
                        >
                            Đăng nhập bằng Facebook
                        </Button>
                        <Typography sx={{textAlign: 'center'}}>
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                variant="body2"
                                sx={{alignSelf: 'center'}}
                            >
                                Đăng ký
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    )
}

export default Login;