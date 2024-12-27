import {Box, Button, MenuItem, Select, Tooltip, Typography, useTheme} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const headerLopHoc = ({selected, handleOnChangeSelect, handleOnClick}) => {
    const theme = useTheme();
    console.log(selected, handleOnChangeSelect, handleOnClick);


    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center", // Căn giữa theo trục dọc
                justifyContent: "space-between",
                flexWrap: "wrap",
                maxHeight: 60,
                gap: 2,
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: 1,
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                sx={{
                    textAlign: "left",
                    flexGrow: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                gutterBottom
            >
                Lớp học
            </Typography>

            <Select
                value={selected}
                onChange={(e) => handleOnChangeSelect(e)}
                sx={{
                    minWidth: 150,
                    maxHeight: 30,
                    backgroundColor: "#fff",
                    textOverflow: "ellipsis",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #ddd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #888",
                    },
                }}
            >
                <MenuItem value={0}>Tất cả</MenuItem>
                {Array.from({length: 13}, (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                    </MenuItem>
                ))}
            </Select>
            <Tooltip title={'Thêm lớp học mới'}>
                <Button
                    onClick={handleOnClick}
                    variant="contained"
                    sx={{
                        borderRadius: "10px",
                        minWidth: "30px",
                        minHeight: "30px",
                        backgroundColor: "#ffffff",
                        color: "#020202",
                    }}
                >
                    <AddIcon sx={{fontSize: 15}}/>
                </Button>
            </Tooltip>
        </Box>
    )
}

export default headerLopHoc;