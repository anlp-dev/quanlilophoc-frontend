import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Backdrop,
    Fade,
} from "@mui/material";
import {notifySuccess, notifyError, notifyInfo} from "../../notification/ToastNotification.jsx";

const AddRoleModal = ({ open, handleClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (formData.name && formData.code) {
            onSave(formData); // Gửi dữ liệu ngược lại qua prop onSave
            setFormData({ name: "", code: "" }); // Reset form
            notifySuccess("Lưu thành công !!!")
            handleClose(); // Đóng Modal
        } else {
            notifyInfo("Vui lòng nhập đầy đủ !!!")
        }
    };

    const style = {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" mb={2}>
                        Thêm vai trò mới
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddRoleModal;
