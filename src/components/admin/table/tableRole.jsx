import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Paper,
    Modal,
    Divider,
    Button,
    Tooltip,
    IconButton,
} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import {Edit, Delete, Add} from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import manageRole from "../../../services/admin/ManageRole.jsx";
import Loading from "../../loading/Loading.jsx";
import Notification from "../../notification/Notification.jsx";

const TableRoleManage = ({isOpen, handleClosePermissionsModal, permissionIds}) => {
    const [permissions, setPermissions] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openMess, setOpenMess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [mess, setMess] = React.useState('');

    useEffect(() => {
        setPermissions(permissionIds);
    }, [permissionIds]);

    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({
            ...prev,
            [id]: {mode: "edit"},
        }));
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel((prev) => ({
            ...prev,
            [id]: {mode: "view"},
        }));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({
            ...prev,
            [id]: {mode: "view"},
        }));
    };

    const handleRowEdit = (newRow) => {
        const updatedPermissions = permissions.map((permission) =>
            permission._id === newRow._id ? {...permission, ...newRow} : permission
        );
        setPermissions(updatedPermissions);
        return newRow;
    };

    const handleAddPermission = () => {
        const newPermission = {
            _id: new Date().getTime().toString(),
            name: "",
            code: "",
            description: "",
            isNew: true,
        };
        setPermissions((prev) => [...prev, newPermission]);
        setRowModesModel((prev) => ({
            ...prev,
            [newPermission._id]: {mode: "edit"},
        }));
    };

    const handleDeletePermission = async (permissionId) => {
        setLoading(true);
        try {
            setPermissions(permissions.filter((p) => p._id !== permissionId));
            await manageRole.removePermission(permissionId);
            setOpen(true)
            setOpenMess(true)
            setIsError(true)
            setMess("Xoá thành công !!!")
        } catch (e) {
            setOpen(true)
            setOpenMess(true)
            setMess(e.message)
            setIsError(false)
        }
        setLoading(false)
    };

    const handleClose = () => {
        setOpen(false);
        setOpenMess(false);
    };

    const handleSaveModal = async () => {
        setLoading(true);
        try {
            await manageRole.savePermission(permissions)
            handleClosePermissionsModal();
        } catch (e) {
            throw new Error(e);
        }
        setLoading(false)
    }

    const columns = [
        {
            field: "name",
            headerName: "Tên quyền hạn",
            flex: 1,
            editable: true,
        },
        {
            field: "description",
            headerName: "Mô tả chi tiết",
            flex: 1,
            editable: true,
        },
        {
            field: "code",
            headerName: "Mã quyền",
            flex: 1,
            editable: true,
        },
        {
            field: "actions",
            headerName: "Hành động",
            flex: 1,
            renderCell: (params) => {
                const isInEditMode = rowModesModel[params.row._id]?.mode === "edit";
                return isInEditMode ? (
                    <>
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            onClick={handleSaveClick(params.row._id)}
                            color="inherit"
                        />
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            onClick={handleCancelClick(params.row._id)}
                            color="inherit"
                        />
                    </>
                ) : (
                    <>
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            onClick={handleEditClick(params.row._id)}
                            color="inherit"
                        />
                        <GridActionsCellItem
                            icon={<DeleteIcon/>}
                            label="Delete"
                            onClick={() => handleDeletePermission(params.row._id)}
                            color="inherit"
                        />
                    </>
                );
            },
        },
    ];


    return (
        <>
            <Modal open={isOpen} onClose={handleClosePermissionsModal}>
                <Box>
                    <Notification
                        open={openMess}
                        message={mess}
                        onClose={handleClose}
                        error={isError}
                    />
                    <Paper elevation={4} sx={{p: 4, m: "auto", marginTop: 3, maxWidth: 1200, borderRadius: 3}}>
                        {loading ? <Loading/> : ''}
                        <Box sx={{mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                                Quản lý Quyền hạn
                            </Typography>
                            <Button
                                startIcon={<Add/>}
                                onClick={handleAddPermission}
                            >
                                Thêm quyền
                            </Button>
                        </Box>
                        <Divider sx={{mb: 2}}/>

                        <div style={{height: 400, width: "100%"}}>
                            <DataGrid
                                rows={permissions}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={setRowModesModel}
                                disableSelectionOnClick
                                processRowUpdate={handleRowEdit}
                                getRowId={(row) => row._id || row.id}
                            />
                        </div>
                        <Box sx={{mt: 2, display: "flex", justifyContent: "flex-end"}}>
                            <Button onClick={() => handleSaveModal()}>Lưu</Button>
                            <Button onClick={() => handleClosePermissionsModal()}>Đóng</Button>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
};

export default TableRoleManage;
