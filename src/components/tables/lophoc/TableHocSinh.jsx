import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const TableHocSinh = (students, handleDialogOpen, handleDelete) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ marginBottom: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Tên học sinh</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Gmail</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleDialogOpen("student", student)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(student.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableHocSinh;