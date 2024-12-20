import * as React from "react";
import {GridRowModes, GridSearchIcon, GridToolbarContainer} from "@mui/x-data-grid";
import {Box, Button, InputAdornment, MenuItem, Select} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {COLUMNS} from "../../../../enums/Columns.jsx";
import TextField from "@mui/material/TextField";

export function EditToolbar(props) {
    const {setRows, setRowModesModel, onSearchChange} = props;
    const [selectedColumn, setSelectedColumn] = React.useState(null);

    const handleClick = () => {
        const id = Math.random().toString(36).substr(2, 9); // Random ID
        setRows((oldRows) => [
            ...oldRows,
            {id, username: '', fullname: '', email: '', role: '', isNew: true},
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'username'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleClick}
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: 1,
                            backgroundColor: '#0099FF',
                            borderRadius: 4,
                            padding: '8px 16px',
                            boxShadow: 1,
                            '&:hover': {
                                backgroundColor: '#0099CC',
                                boxShadow: 2
                            },
                        }}
                    >
                        Thêm người dùng
                    </Button>
                </Box>
                <Box sx={{marginLeft: 1}}>
                    <Select
                        value={selectedColumn}
                        onChange={(e) => setSelectedColumn(e.target.value)}
                        sx={{
                            height: 40,
                            borderRadius: 4,
                            boxShadow: 1,
                            padding: '8px 16px',
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                    >
                        {COLUMNS.map((col) => (
                            <MenuItem key={col.value} value={col.value}>
                                {col.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm..."
                        onChange={(e) => onSearchChange(selectedColumn, e.target.value)}
                        sx={{
                            minWidth: 150,
                            height: 40,
                            borderRadius: 4,
                            boxShadow: 1,
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GridSearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
        </GridToolbarContainer>

    );
}