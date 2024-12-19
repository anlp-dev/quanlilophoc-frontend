import React, {useEffect, useState, useRef} from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItemButton,
    Checkbox,
    FormControlLabel,
    Button,
    TextField,
    Modal,
    Slide,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import {Visibility, Edit, Delete, Add} from "@mui/icons-material";
import {DataGrid} from "@mui/x-data-grid";
import TableRole from "./table/tableRole.jsx";
import TableRoleManage from "./table/tableRole.jsx";
import manageRole from "../../services/admin/ManageRole.jsx";
import Loading from "../loading/Loading.jsx";
import AddRoleModal from "./modal/AddRoleModal.jsx";
import Notification from "../notification/Notification.jsx";


const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
    const [editPermission, setEditPermission] = useState(null);
    const [open, setOpen] = useState(false);
    const [openMess, setOpenMess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [mess, setMess] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data_role_permissions = await manageRole.getRolePermission();
            const data_permissions = await manageRole.getPermission();
            setRoles(data_role_permissions)
            setPermissions(data_permissions)
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const handleRoleClick = (role) => {
        setSelectedRole(role);
    };

    const handlePermissionChange = (permissionId) => {
        if (selectedRole) {
            // Tìm vai trò đang chọn
            const updatedRole = roles.find(role => role._id === selectedRole._id);

            // Cập nhật quyền hạn
            const newPermissions = updatedRole?.permissionIds.includes(permissionId)
                ? updatedRole.permissionIds.filter((p) => p !== permissionId)
                : [...updatedRole.permissionIds, permissionId];

            // Cập nhật lại state cho roles và selectedRole
            setRoles(
                roles.map((role) => (role._id === selectedRole._id ? {...role, permissionIds: newPermissions} : role))
            );
            setSelectedRole({...selectedRole, permissionIds: newPermissions});
        }
    };

    const handleClose = () => {
        setOpen(false);
        setOpenMess(false);
    };

    const handleOpenPermissionsModal = () => setIsPermissionsModalOpen(true);
    const handleClosePermissionsModal = () => {
        fetchData();
        setIsPermissionsModalOpen(false);
    }

    const handleOpenRoleModal = () => setIsModalOpen(true);
    const handleCloseRoleModal = () => {
        setIsModalOpen(false);
        fetchData();
    }

    const handleEditPermission = (permission) => {
        setEditPermission(permission);
    };

    const handleDeletePermission = (permissionId) => {
        setPermissions(permissions.filter((p) => p.id !== permissionId));
        setRoles(
            roles.map((role) => ({
                ...role,
                permissions: role.permissions.filter((p) => p !== permissionId),
            }))
        );
    };

    const handleSavePermissions = async () => {
        console.log("Permissions saved for:", selectedRole);
        setLoading(true)
        try {
            await manageRole.saveRolePermission(selectedRole);
            fetchData();
            setOpenMess(true)
            setOpen(true);
            setMess("Lưu thành công !!!")
            setIsError(true);
        } catch (e) {
            setOpenMess(true)
            setOpen(true);
            setMess("Thất bại !!!")
            setIsError(false);
        }
        setLoading(false)
    };

    const onSave = async (role) => {
        setLoading(true);
        try {
            await manageRole.saveRole(role);
            fetchData();
        } catch (e) {
            throw new Error(e);
        }
        setLoading(false);
    }


    return (
        <Slide direction="up" in>
            <Box>
                <Notification
                    open={openMess}
                    message={mess}
                    onClose={handleClose}
                    error={isError}
                />
                <Paper elevation={4}
                       sx={{p: 4, m: "auto", marginTop: 3, width: "100%", maxWidth: 1550, borderRadius: 3}}>
                    {loading ? <Loading/> : ''}
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                        Quản lý Vai trò và Quyền hạn
                    </Typography>
                    <Divider sx={{my: 2}}/>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{p: 2, borderRadius: 3}}>
                                <Box sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                                        Danh sách vai trò
                                    </Typography>
                                    <Button
                                        startIcon={<Add/>}
                                        onClick={handleOpenRoleModal}
                                    >
                                        Thêm vai trò
                                    </Button>
                                </Box>
                                <Divider sx={{my: 1}}/>
                                <List>
                                    {roles.map((role) => (
                                        <ListItemButton
                                            key={role?._id}
                                            selected={selectedRole?._id === role._id}
                                            onClick={() => handleRoleClick(role)}
                                            sx={{
                                                mb: 1,
                                                borderRadius: 2,
                                                "&:hover": {backgroundColor: "#f0f0f0"},
                                            }}
                                        >
                                            <Typography variant="body1">{role?.roleId?.name}</Typography>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        {/* Permission Details */}
                        <Grid item xs={12} md={8}>
                            <Paper elevation={3} sx={{p: 3, borderRadius: 3}}>
                                <Box sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                                        Chi tiết quyền hạn
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Visibility/>}
                                        onClick={handleOpenPermissionsModal}
                                    >
                                        Xem tất cả quyền hạn
                                    </Button>
                                </Box>
                                <Divider sx={{my: 1}}/>
                                {selectedRole ? (
                                    <>
                                        <Grid container spacing={2}>
                                            {permissions.map((permission) => (
                                                <Grid item xs={12} sm={6} md={4} key={permission._id}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={selectedRole?.permissionIds.includes(permission._id)}
                                                                onChange={() => handlePermissionChange(permission._id)}
                                                            />
                                                        }
                                                        label={permission?.name}
                                                    />
                                                    <Typography variant="body2" color="text.secondary" sx={{ml: 4}}>
                                                        {permission?.description}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Box sx={{mt: 2, display: "flex", justifyContent: "space-between"}}>
                                            <Button variant="contained" onClick={handleSavePermissions}>
                                                Lưu
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Typography variant="body1" color="text.secondary">
                                        Chọn một vai trò để xem chi tiết.
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Them vai tro modal */}
                    <AddRoleModal open={isModalOpen} handleClose={handleCloseRoleModal} onSave={onSave}/>

                    {/* Permissions Modal */}
                    <TableRoleManage isOpen={isPermissionsModalOpen}
                                     handleClosePermissionsModal={handleClosePermissionsModal}
                                     permissionIds={permissions}/>
                </Paper>
            </Box>
        </Slide>
    );
};

export default RoleManagement;
