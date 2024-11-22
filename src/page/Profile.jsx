import React, {useEffect, useState} from 'react';
import {Grid, Typography, Avatar, Button, List, ListItem, ListItemText, Divider} from '@mui/material';
import {motion} from 'framer-motion';
import {styled} from '@mui/material/styles'; // Import styled từ Material UI
import {keyframes} from '@emotion/react';
import {jwtDecode} from "jwt-decode";
import apiConfig from "../configs/apiConfig.jsx";
import ModalProfile from "../components/modals/modalProfile.jsx";
import AccountProfileInfo from "../components/Profile/AccountProfileInfo.jsx"; // Import keyframes từ emotion


const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;


const StyledAvatar = styled(Avatar)(({theme}) => ({
    width: 200,
    height: 200,
    border: '4px solid #fff',
    boxShadow: theme.shadows[5],
    animation: `${rotateAnimation} 2s linear infinite`,
}));


const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0069d9',
        boxShadow: theme.shadows[8],
    }
}));

const variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
};

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const token_decode = jwtDecode(token);
                    const res = await fetch(`${apiConfig.baseUrl}/auth/account/${token_decode.userId}`, {
                        method: 'GET',
                        headers: apiConfig.getAuthHeaders(token)
                    });

                    if (!res.ok) {
                        const errorData = await res.json(); // Hoặc res.text() tùy theo response
                        console.error("Lỗi server:", errorData);
                    }
                    const data = await res.json();
                    setUser(data.data);


                } catch (error) {
                    console.error("Lỗi network:", error);
                }
            }
        };

        fetchData();

    }, []);


    const handleOpenClick = () => {
        setOpenModal(true);
    };


    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                style={{
                    padding: '2rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <motion.div whileHover={{scale: 1.1}}>
                            <StyledAvatar alt="Tên người dùng" src="/avatar.jpg"/>
                        </motion.div>
                        <Typography variant="h4"
                                    sx={{color: '#333', textAlign: 'center', mt: 2}}>{user.fullname}</Typography>
                        <Typography variant="subtitle1"
                                    sx={{color: '#666', textAlign: 'center', mb: 2}}>{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h6" sx={{color: '#555', mb: 1}}>Thông tin người dùng</Typography>
                        <Divider sx={{mb: 2}}/>
                        <AccountProfileInfo account={user}/>
                        <motion.div whileHover={{scale: 1.05}}>
                            <StyledButton variant="contained" sx={{mt: 2}} onClick={() => handleOpenClick()}>
                                Chỉnh sửa hồ sơ
                            </StyledButton>
                            <ModalProfile openData={openModal} onClose={() => setOpenModal(false)}/>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>

        </>
    );
}

export default Profile;