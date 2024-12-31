import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material';

const TableMonHoc = () => {
  return ( 
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
  )
}

export default TableMonHoc;
