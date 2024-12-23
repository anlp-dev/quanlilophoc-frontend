import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    Avatar,
    Button,
    Divider,
    Card,
    CardContent,
    CardActions,
    Box, Slide, Paper, Fade, useTheme,
} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles';
import {keyframes} from '@emotion/react';
import {jwtDecode} from 'jwt-decode';
import apiConfig from '../configs/apiConfig.jsx';
import ModalProfile from '../components/modals/ModalProfile.jsx';
import AccountProfileInfo from '../components/Profile/AccountProfileInfo.jsx';
import userService from '../services/UserService.jsx'
import Loading from "../components/loading/Loading.jsx";
import Notification from "../components/notification/Notification.jsx";
import {MESSAGE_ERROR, Message} from "../enums/Message.jsx";
import Account from "../components/Profile/Account.jsx";

// Styled Button
const StyledButton = styled(Button)(({theme}) => ({
    background: 'linear-gradient(45deg, #ff758c, #ff7eb3)',
    color: '#fff',
    padding: '10px 20px',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '30px',
    boxShadow: '0 4px 12px rgba(255, 117, 140, 0.5)',
    '&:hover': {
        background: 'linear-gradient(45deg, #ff7eb3, #ff758c)',
    },
}));

// Motion animation variants
const variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
};

const Profile = () => {
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openMess, setOpenMess] = useState(false);
    const [messNotification, setMessNotification] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await userService.loadDataUser(token);
                    const data = await res.data;
                    setUser(data);
                } catch (error) {
                    console.error('Network error:', error);
                }
            }
        };

        fetchData();
    }, []);

    const refreshProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const data = await userService.loadDataUser(token);
            setUser(data.data);
            setOpenMess(true)
            setMessNotification(Message.UPDATE_PROFILE);
            setIsLoading(true);
            setTimeout(() => {
                setOpenMess(false)
                setMessNotification('');
                setIsLoading(false);
            }, 500);
        } catch (e) {
            setOpenMess(true)
            setMessNotification(MESSAGE_ERROR.UPDATE_PROFILE);
            setIsLoading(true);
            setTimeout(() => {
                setOpenMess(false)
                setMessNotification('');
                setIsLoading(false);
            }, 500);
            console.error('Network error:', e);
        }
    };

    const handleOpenClick = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenMess(false);
    };

    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 1,
                    width: '100%',
                    height: "98vh",
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="#DB7093" gutterBottom>
                    Thông tin cá nhân
                </Typography>
                    {isLoading &&
                        <>
                            <Loading/>
                        </>}
                    <Notification
                        open={openMess}
                        message={messNotification}
                        onClose={handleClose}
                    />

                    <Grid container spacing={3} justifyContent="center">
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >

                            <Account user={user}/>
                        </Grid>


                        {/* User Information Section */}
                        <Grid item xs={12} md={8}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '15px',
                                }}
                            >

                                <AccountProfileInfo account={user}/>
                                <CardActions sx={{justifyContent: 'right', marginBottom: 1, marginRight: 4}}>
                                    <motion.div whileHover={{scale: 1.05}}>
                                        <StyledButton onClick={() => handleOpenClick()}>
                                            Chỉnh sửa hồ sơ
                                        </StyledButton>
                                        <ModalProfile
                                            openData={openModal}
                                            onClose={() => setOpenModal(false)}
                                            account={user}
                                            onUpdate={refreshProfile}
                                        />
                                    </motion.div>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
            </Paper>
        </Slide>
    );
};

export default Profile;
