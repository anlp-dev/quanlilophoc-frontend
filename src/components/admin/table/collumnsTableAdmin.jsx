import React from 'react';
import {Box, MenuItem, Select} from '@mui/material';
import {GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import {STATUS, STATUS_OPTIONS, ROLE_OPTIONS} from "../../../enums/Status.jsx";

const CustomSelectCell = ({value, onValueChange, options}) => (
    <Select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        fullWidth
        size="small"
    >
        {options.map((option) => (
            <MenuItem key={option.code} value={option.code}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            marginRight: 1,
                        }}
                    />
                    <span>{option.name}</span>
                </Box>
            </MenuItem>
        ))}
    </Select>
);

// Component StatusCell
const StatusCell = ({statusCode}) => {
    const status =
        Object.values(STATUS).find((s) => s.code === statusCode) || STATUS.UNKNOWN;

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: status.color,
                    marginRight: 1,
                }}
            />
            <span>{status.name}</span>
        </Box>
    );
};

const StatusCellRole = ({role}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    marginRight: 1,
                }}
            />
            <span>{role.name}</span>
        </Box>
    );
};

// Hàm tạo columns
export const getUserTableColumns = ({
                                        rowModesModel,
                                        handleSaveClick,
                                        handleCancelClick,
                                        handleEditClick,
                                        handleDeleteClick,
                                        role,
                                    }) => [
    {field: 'serial', headerName: "STT", width: 80},
    {field: 'username', headerName: 'Tên đăng nhập', width: 150, editable: true},
    {field: 'fullname', headerName: 'Họ và tên', width: 200, editable: true},
    {field: 'email', headerName: 'Email', width: 200, editable: true},
    {
        field: 'role', headerName: 'Role', width: 200,
        renderCell: (params) => (
            <StatusCellRole role={params.value}/>
        ),
        renderEditCell: (params) => (
            <CustomSelectCell
                value={params.value}
                onValueChange={(newValue) => {
                    params.api.setEditCellValue({
                        id: params.id,
                        field: params.field,
                        value: newValue,
                    });
                }}
                options={role}
            />
        ),
        editable: true
    },
    {field: 'createdAt', headerName: 'Ngày tạo', width: 150, editable: false},
    {field: 'updatedAt', headerName: 'Ngày sửa', width: 150, editable: false},
    {field: 'deletedAt', headerName: 'Ngày xóa', width: 150, editable: false},
    {field: 'phoneNumber', headerName: 'Số điện thoại', width: 150, editable: true},
    {field: 'address', headerName: 'Địa chỉ', width: 200, editable: true},
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 190,
        editable: true,
        renderCell: (params) => <StatusCell statusCode={params.row.status}/>,
        renderEditCell: (params) => (
            <CustomSelectCell
                value={params.value}
                onValueChange={() => console.log(params.value)}
                options={STATUS_OPTIONS}
            />
        ),
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Hành động',
        width: 120,
        renderCell: (params) => {
            const isInEditMode = rowModesModel[params.id]?.mode === 'edit';
            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon/>}
                        label="Save"
                        onClick={handleSaveClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon/>}
                        label="Cancel"
                        onClick={handleCancelClick(params.id)}
                        color="inherit"
                    />,
                ];
            }
            return [
                <GridActionsCellItem
                    icon={<VisibilityIcon/>}
                    label="View"
                    onClick={() => console.log('View', params.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Edit"
                    onClick={handleEditClick(params.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={handleDeleteClick(params.id)}
                    color="inherit"
                />,
            ];
        },
    },
];
