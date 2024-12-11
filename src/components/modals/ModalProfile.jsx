import React, {useState, useEffect} from 'react';
import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    Divider,
    FormControl,
    FormHelperText,
    MenuItem,
    Select
} from '@mui/material';
import {Person as PersonIcon} from '@mui/icons-material';
import {validateFormModal} from '../../utils/validate.jsx';
import userService from '../../services/UserService.jsx'
import {MESSAGE_ERROR, Message} from "../../enums/Message.jsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

const ModalProfile = ({openData, onClose, account, onUpdate}) => {
    const [fullname, setFullname] = useState(account?.fullname || '');
    const [phone, setPhone] = useState(account?.teacherId?.phoneNumber || account?.studentId?.phoneNumber || '');
    const [address, setAddress] = useState(account?.teacherId?.address || account?.studentId?.address || '');
    const [gender, setGender] = useState(account?.teacherId?.gender || account?.studentId?.gender || ''); // 'male', 'female', 'other'
    const [dateOfBirth, setDateOfBirth] = useState(account?.teacherId?.dateOfBirth || account?.studentId?.dateOfBirth || '');
    const [formError, setFormError] = useState({});


    useEffect(() => {
        setFullname(account?.fullname || '');
        setPhone(account?.teacherId?.phoneNumber || account?.studentId?.phoneNumber || '');
        setAddress(account?.teacherId?.address || account?.studentId?.address || '');
        setGender(account?.teacherId?.gender || account?.studentId?.gender || '');
        if (account?.teacherId?.dateOfBirth || account?.studentId?.dateOfBirth) {
            setDateOfBirth(new Date(account?.teacherId?.dateOfBirth || account?.studentId?.dateOfBirth).toLocaleDateString('en-CA'));
        }
    }, [account]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                fullname,
                phone,
                address,
                gender,
                dateOfBirth,
            };
            const errors = validateFormModal(updatedData);
            if (Object.keys(errors).length > 0) {
                setFormError(errors);
                return;
            }
            const response = await userService.updateUser(updatedData, account?._id);
            if(response.status === 200){
                onUpdate();
                onClose();
            }else{
            }
        } catch (e) {
            throw new Error(e);
        }
    };

    const isFormIncomplete = !fullname || !phone || !address || !gender || !dateOfBirth;

    return (
        <Modal
            open={openData}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* Avatar and Title */}
                <Avatar sx={{bgcolor: '#1976d2', width: 56, height: 56, margin: '0 auto', mb: 2}}>
                    <PersonIcon/>
                </Avatar>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold', mb: 2}}>
                    Chỉnh sửa thông tin người dùng
                </Typography>
                <Divider sx={{mb: 2}}/>

                {/* Form Fields */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={!!formError.fullname}
                                helperText={formError.fullname}
                                label="Họ và Tên"
                                variant="outlined"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={!!formError.phonenumber}
                                helperText={formError.phonenumber}
                                label="Số điện thoại"
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={!!formError.address_location}
                                helperText={formError.address_location}
                                label="Địa chỉ"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!formError.gender_error}>
                            <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                displayEmpty
                                variant="outlined"
                            >
                                <MenuItem value="">Chọn giới tính</MenuItem>
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                                <MenuItem value="Khác">Khác</MenuItem>
                            </Select>
                            <FormHelperText>{!!formError.gender_error ? formError.gender_error : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                error={!!formError.dob}
                                helperText={formError.dob}
                                label="Ngày sinh"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                InputLabelProps={{shrink: true}}
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Buttons */}
                <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 3}}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                            padding: '10px 20px',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#f50057',
                                color: '#fff',
                            },
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                            padding: '10px 20px',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                        disabled={isFormIncomplete}
                    >
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalProfile;
