import * as React from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Slide,
    Fade,
    Grid,
    useTheme,
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
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {getUserTableColumns} from "../tables/collumnsTableAdmin.jsx";
import { useEffect } from 'react';
import userByAdminService from '../../services/admin/UserByAdminService.jsx';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.random().toString(36).substr(2, 9); // Random ID
        setRows((oldRows) => [
            ...oldRows,
            { id, username: '', fullname: '', email: '', role: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClick}
                sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'secondary.main',
                    '&:hover': { backgroundColor: 'secondary.dark' },
                }}
            >
                Thêm người dùng
            </Button>
        </GridToolbarContainer>
    );
}

export default function QuanTriNguoiDung() {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await userByAdminService.getAllUsers();
                const flatData = resData.data.map((user) => ({
                    id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.roleId?.name || 'Unknown',
                    createdAt: new Date(user.createdAt).toLocaleDateString() || 'N/A',
                    updatedAt: new Date(user.updatedAt).toLocaleDateString() || 'N/A',
                    deletedAt: new Date(user.deletedAt).toLocaleDateString() || 'N/A',
                    phoneNumber: user.teacherId?.phoneNumber || user.studentId?.phoneNumber || 'N/A',
                    address: user.teacherId?.address || user.studentId?.address || 'N/A',
                    status: user.status
                }));
                setRows(flatData);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = getUserTableColumns({rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick})

    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 3,
                    width: '100%',
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Quản lý người dùng
                </Typography>
                <Fade in>
                    <Box sx={{ height: 850 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slots={{ toolbar: EditToolbar }}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel },
                            }}
                            sx={{
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: 'secondary.light',
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    height: 60,
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
