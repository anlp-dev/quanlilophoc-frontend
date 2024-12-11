import React, {useState} from 'react';
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
    Avatar,
    Grid, Switch,
} from '@mui/material';
import {Visibility, VisibilityOff, Person, Edit} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {motion} from "framer-motion";
import {keyframes} from '@emotion/react';
import Chip from '@mui/material/Chip';

const ContentBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 500,
    borderRadius: '16px',
    background: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#333',
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

const StyledFormControl = styled(FormControl)(({theme}) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

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

const StyledChip = styled(Chip)(({theme}) => ({
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(1),
    borderRadius: "16px",
    fontWeight: "bold",
    "& .MuiSwitch-root": {
        marginLeft: theme.spacing(1),
    },
}));

const LabelBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
    borderRadius: "8px",
    border: "1px solid #ff758c",
}));

const Account = ({user}) => {
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const handleToggle = () => {
        setEnabled(!enabled);
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handlePasswordChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (
        <ContentBox>
            <motion.div whileHover={{scale: 1.1}}>
                <StyledAvatar alt={user.fullname} src="/avatar.jpg"/>
            </motion.div>
            <Typography
                variant="h4"
                sx={{color: '#333', fontWeight: 'bold', mt: 2}}
            >
                {user?.fullname}
            </Typography>
            <Typography variant="subtitle1" sx={{color: '#777', mb: 2}}>
                {user?.email}
            </Typography>

            <LabelBox>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#333" }}
                >
                    Mật khẩu:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                        ******************
                    </Typography>
                    <IconButton sx={{ color: "#ff6b81" }}>
                        <Edit />
                    </IconButton>
                </Box>
            </LabelBox>

            {/* Switch Xác thực 2 yếu tố */}
            <LabelBox>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#333" }}
                >
                    Xác thực 2 yếu tố: {enabled ? "bật" : "tắt"}
                </Typography>
                <Switch
                    checked={enabled}
                    onChange={handleToggle}
                    sx={{
                        "& .MuiSwitch-track": {
                            backgroundColor: enabled ? "#ff758c" : "#ccc",
                        },
                        "& .MuiSwitch-thumb": {
                            backgroundColor: enabled ? "#ff6b81" : "#fff",
                        },
                    }}
                />
            </LabelBox>
        </ContentBox>
    );
}

export default Account;
