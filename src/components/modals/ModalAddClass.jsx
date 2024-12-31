import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Grid,
    Box,
    Typography,
    IconButton,
    InputAdornment
} from "@mui/material";
import {AddCircleOutline, Class, Person, Assignment, School} from "@mui/icons-material";
import crudClassService from "../../services/lophoc/CrudClassService.jsx"
import {notifyInfo, notifyError, notifySuccess} from "../../components/notification/ToastNotification.jsx"
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {ClearIcon} from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";

const ModalAddClass = ({openData, onClose, editMode, classDataEdit}) => {
    const [classData, setClassData] = useState({
        code: "",
        khoi: "",
        className: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setClassData({
            ...classData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const res_data = await crudClassService.add(classData);
            console.log(res_data)
            if (res_data.status === 200) {
                notifySuccess(res_data.message)
            }
            setClassData({})
        } catch (e) {
            notifyError(e.message);
        } finally {
            onClose();
        }
    };

    const handleSaveClass = async () => {
        try {
            const dataUpdate = {
                _id: classDataEdit._id,
                code: classData.code,
                khoi: classData.khoi,
                className: classData.className,
            }
            const res_data = await crudClassService.update(dataUpdate);
            if (res_data.status === 200) {
                notifySuccess(res_data.message)
            }
            setClassData({});
        } catch (e) {
            notifyError(e.message);
        } finally {
            onClose();
        }
    }

    const handleRemoveClass = async () => {
        try {
            const show = window.confirm("Bạn có muốn xóa lớp học?")
            if (show) {
                const dataRemove = {
                    _id: classDataEdit._id
                }
                const res_data = await crudClassService.delete(dataRemove);
                if (res_data.status === 200) {
                    notifySuccess(res_data.message)
                }
                setClassData({});
            }
        } catch (e) {
            notifyError(e.message)
        } finally {
            onClose();
        }
    }

    return (
        <>
            <Dialog open={openData} onClose={onClose} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: '-50%', // Dịch modal lên trên
            }}>
                <DialogTitle sx={{textAlign: "center", fontWeight: "bold", color: "#1976d2"}}>
                    {editMode ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {/* Mã lớp học */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="Mã lớp học"
                                fullWidth
                                name="code"
                                value={classData.code ? classData.code : classDataEdit?.ma}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{backgroundColor: "#f5f5f5"}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Class/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {/* Khối lớp */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="Khối lớp"
                                type="number"
                                fullWidth
                                name="khoi"
                                value={classData.khoi ? classData.khoi : classDataEdit?.khoi}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{backgroundColor: "#f5f5f5"}}
                                inputProps={{min: 1, max: 12}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {/* Tên lớp học */}
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Tên Lớp Học"
                                fullWidth
                                name="className"
                                value={classData.className ? classData.className : classDataEdit?.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{backgroundColor: "#f5f5f5"}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{justifyContent: "center"}}>

                    {editMode ? (
                        <>
                            <Button startIcon={<SaveIcon/>} onClick={handleSaveClass} color="error" variant="contained"
                                    sx={{backgroundColor: "#32c013", marginRight: 2}}>
                                Lưu
                            </Button>
                            <Button startIcon={<DeleteIcon/>} onClick={handleRemoveClass} color="success"
                                    variant="contained"
                                    sx={{backgroundColor: "#ff0000", marginRight: 2}}>
                                Xóa
                            </Button>
                        </>
                    ) : (
                        <Button startIcon={<AddIcon/>} onClick={handleSubmit} color="primary" variant="contained"
                                sx={{backgroundColor: "#1976d2", marginRight: 2}}>
                            Thêm
                        </Button>
                    )}
                    <Button startIcon={<ClearIcon/>} onClick={onClose} color="secondary" variant="outlined" sx={{}}>
                        Hủy
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalAddClass;
