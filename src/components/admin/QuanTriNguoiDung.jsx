import * as React from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Slide,
    Fade,
    Grid,
    useTheme, Select, InputAdornment, MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons, GridSearchIcon,
} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getUserTableColumns} from "./table/collumnsTableAdmin.jsx";
import {useEffect} from 'react';
import userByAdminService from '../../services/admin/UserByAdminService.jsx';
import {EditToolbar} from '../admin/table/toolbars/editToolBars.jsx'
import apiConfig from "../../configs/apiConfig.jsx";

export default function QuanTriNguoiDung() {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [searchFilters, setSearchFilters] = React.useState({});
    const [role, setRole] = React.useState([]);
    const theme = useTheme();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await userByAdminService.getAllUsers();
                if (resData.status === 200) {
                    const flatData = resData.data.map((user) => ({
                        id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        role: user?.roleId || 'Unknown',
                        createdAt: new Date(user.createdAt).toLocaleDateString() || 'N/A',
                        updatedAt: new Date(user.updatedAt).toLocaleDateString() || 'N/A',
                        deletedAt: new Date(user.deletedAt).toLocaleDateString() || 'N/A',
                        phoneNumber: user.teacherId?.phoneNumber || user.studentId?.phoneNumber || 'N/A',
                        address: user.teacherId?.address || user.studentId?.address || 'N/A',
                        status: user.status
                    }));
                    setRows(flatData);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        getAllRow();
    }, []);

    const getAllRow = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${apiConfig.baseUrl}/admin/roles-manage`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            })
            const data = await res.json();
            console.log(data);
            setRole(data?.data);
        }catch (e) {
            throw new Error(e);
        }
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
        console.log(rows.filter((row) => row.id === id));
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const onSearchChange = (field, value) => {
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value.toLowerCase(), // Chuyển từ khóa thành chữ thường để tìm kiếm không phân biệt chữ hoa/chữ thường
        }));
    };

// Hàm lọc dữ liệu
    const filteredData = rows.filter((row) => {
        return Object.keys(searchFilters).every((key) => {
            const filterValue = searchFilters[key];
            if (!filterValue) return true; // Nếu không có bộ lọc cho trường này, không cần kiểm tra
            return row[key]?.toString().toLowerCase().includes(filterValue);
        });
    });


    const columns = getUserTableColumns({
        rowModesModel,
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick,
        role
    })

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
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Quản lý người dùng
                </Typography>
                <Fade in>
                    <Box sx={{height: 860}}>
                        <DataGrid
                            rows={filteredData.map((item, index) => ({...item, serial: index + 1}))}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slots={{toolbar: EditToolbar}}
                            slotProps={{
                                toolbar: {setRows, setRowModesModel, onSearchChange},
                            }}
                            sx={{
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    height: 60,
                                    textAlign: 'center'
                                },
                                '& .MuiDataGrid-row': {
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        />
                    </Box>
                </Fade>
            </Paper>
        </Slide>
    );
}
