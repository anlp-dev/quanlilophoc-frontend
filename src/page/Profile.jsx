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
    Box,
} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles';
import {keyframes} from '@emotion/react';
import {jwtDecode} from 'jwt-decode';
import apiConfig from '../configs/apiConfig.jsx';
import ModalProfile from '../components/modals/modalProfile.jsx';
import AccountProfileInfo from '../components/Profile/AccountProfileInfo.jsx';
import userService from '../services/userService.jsx'
import Loading from "../components/loading/Loading.jsx";
import Notification from "../components/notification/Notification.jsx";
import {MESSAGE_ERROR, MESSAGE} from "../enums/message.jsx";

// Gradient animation for the avatar border
const gradientAnimation = keyframes`
    0% {
        border-color: #ff7eb3;
    }
    50% {
        border-color: #ff758c;
    }
    100% {
        border-color: #ff7eb3;
    }
`;

// Styled Avatar
const StyledAvatar = styled(Avatar)(({theme}) => ({
    width: 200,
    height: 200,
    border: '6px solid',
    borderColor: '#ff758c',
    animation: `${gradientAnimation} 3s linear infinite`,
    boxShadow: '0 4px 15px rgba(255, 117, 140, 0.5)',
}));

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
        try{
            const data = await userService.loadDataUser(token);
            setUser(data.data);
            setOpenMess(true)
            setMessNotification(MESSAGE.UPDATE_PROFILE);
            setIsLoading(true);
            setTimeout(() => {
                setOpenMess(false)
                setMessNotification('');
                setIsLoading(false);
            }, 500);
        }catch (e) {
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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #fdfcfb, #e2d1c3)',
                borderRadius: '0px',
                height: '122%',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
            }}
        >
            {isLoading &&
                <>
                    <Loading/>
                </>}
            <Notification
                open={openMess}
                message={messNotification}
                onClose={handleClose}
            />

            <Grid container spacing={5} justifyContent="center">
                {/* Avatar Section */}
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
                    <motion.div whileHover={{scale: 1.1}}>
                        <StyledAvatar alt={user.fullname} src="/avatar.jpg" />
                    </motion.div>
                    <Typography
                        variant="h4"
                        sx={{color: '#333', fontWeight: 'bold', mt: 2}}
                    >
                        {user.fullname}
                    </Typography>
                    <Typography variant="subtitle1" sx={{color: '#777', mb: 2}}>
                        {user.email}
                    </Typography>
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
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{color: '#555', fontWeight: 'bold', mb: 2}}
                            >
                                Thông tin người dùng
                            </Typography>
                            <Divider sx={{mb: 2}} />
                            <AccountProfileInfo account={user} />
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center', marginBottom: 1}}>
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
        </motion.div>
    );
};

export default Profile;
