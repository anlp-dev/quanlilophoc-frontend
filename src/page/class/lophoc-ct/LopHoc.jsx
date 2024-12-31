import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Slide,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useParams } from "react-router-dom";
import HeaderLopHoc from "../../../components/headers/lophoc/HeaderLopHoc.jsx";

const LopHoc = () => {
    const theme = useTheme();
    const { classId } = useParams();
    const navigate = useNavigate();

    // States
    const [students, setStudents] = useState([{ id: 1, name: "Nguyen A" }, { id: 2, name: "Nguyen B" }]);
    const [subjects, setSubjects] = useState([{ id: 1, name: "Toán" }, { id: 2, name: "Tiếng Anh" }]);
    const [assignments, setAssignments] = useState([{ id: 1, subjectId: 1, title: "Bài tập 1" }, { id: 2, subjectId: 2, title: "Bài tập 2" }]);

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState("");
    const [currentItem, setCurrentItem] = useState(null);

    const handleDialogOpen = (type, item) => {
        setDialogType(type);
        setCurrentItem(item);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setCurrentItem(null);
    };

    const handleSave = () => {
        // Lưu dữ liệu (add/edit)
        handleDialogClose();
    };

    const handleDelete = (id) => {
        if (dialogType === "student") {
            setStudents(students.filter((student) => student.id !== id));
        } else if (dialogType === "subject") {
            setSubjects(subjects.filter((subject) => subject.id !== id));
        } else if (dialogType === "assignment") {
            setAssignments(assignments.filter((assignment) => assignment.id !== id));
        }
        handleDialogClose();
    };

    return (
        <Slide direction="left" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: "auto",
                    marginTop: 1,
                    width: "100%",
                    height: "98vh",
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: theme.shadows[5],
                    overflowY: "auto",
                }}
            >
                <HeaderLopHoc titleBar={"Chi tiết lớp học"} />
                <Box sx={{ padding: 3 }}>
                    {/* Danh sách học sinh */}
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Danh sách học sinh</Typography>
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

                    {/* Danh sách môn học */}
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Danh sách môn học</Typography>
                    <TableContainer component={Paper} elevation={3} sx={{ marginBottom: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên môn học</TableCell>
                                    <TableCell align="right">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subjects.map((subject, index) => (
                                    <TableRow key={subject.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{subject.name}</TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDialogOpen("subject", subject)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(subject.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Danh sách bài tập */}
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Bài tập</Typography>
                    <TableContainer component={Paper} elevation={3} sx={{ marginBottom: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tiêu đề bài tập</TableCell>
                                    <TableCell>Môn học</TableCell>
                                    <TableCell align="right">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignments.map((assignment, index) => (
                                    <TableRow key={assignment.id}>
                                  <TableCell>{index + 1}</TableCell>
                                        <TableCell>{assignment.title}</TableCell>
                                        <TableCell>
                                            {subjects.find((sub) => sub.id === assignment.subjectId)?.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDialogOpen("assignment", assignment)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(assignment.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Thêm học sinh, môn học, bài tập */}
                    <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => handleDialogOpen("student")}>
                            Thêm học sinh <AddIcon />
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDialogOpen("subject")}>
                            Thêm môn học <AddIcon />
                        </Button>
                        <Button variant="contained" color="success" onClick={() => handleDialogOpen("assignment")}>
                            Thêm bài tập <AddIcon />
                        </Button>
                    </Box>

                    {/* Dialog thêm/sửa */}
                    <Dialog open={openDialog} onClose={handleDialogClose}>
                        <DialogTitle>{dialogType === "student" ? "Thêm/Sửa học sinh" : dialogType === "subject" ? "Thêm/Sửa môn học" : "Thêm/Sửa bài tập"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label={dialogType === "student" ? "Tên học sinh" : dialogType === "subject" ? "Tên môn học" : "Tiêu đề bài tập"}
                                variant="outlined"
                                fullWidth
                                defaultValue={currentItem ? currentItem.name : ""}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">Hủy</Button>
                            <Button onClick={handleSave} color="primary">Lưu</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Paper>
        </Slide>
    );
};

export default LopHoc;
