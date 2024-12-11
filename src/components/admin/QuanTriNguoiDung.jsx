import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Box,
    Typography,
    IconButton,
    Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const QuanTriNguoiDung = () => {
    const users = [
        { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', role: 'Admin' },
        { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', role: 'User' },
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Quản lý người dùng
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Họ và tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Vai trò</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton color="primary" sx={{ marginRight: 1 }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default QuanTriNguoiDung;
