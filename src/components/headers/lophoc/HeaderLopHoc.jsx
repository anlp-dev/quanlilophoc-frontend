import {Box, Breadcrumbs, Button, MenuItem, Select, Tooltip, Typography, useTheme} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {Link} from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const headerLopHoc = ({selected = null, handleOnChangeSelect = null, handleOnClick = null, titleBar = null}) => {
    const theme = useTheme();


    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center", // Căn giữa theo trục dọc
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
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                <Breadcrumbs
                    separator={titleBar ? <ChevronRightIcon fontSize="small"/> : null}
                    aria-label="breadcrumb"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        color: 'text.primary',
                    }}
                >
                    <Link to="/class" style={{textDecoration: 'none', color: 'inherit'}}>
                        Lớp học
                    </Link>
                    <Link to="#" style={{textDecoration: 'none', color: 'inherit'}}>
                        {titleBar}
                    </Link>
                </Breadcrumbs>
            </Typography>
            {titleBar ? null : (
                <Box sx={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
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
                                marginLeft: 2, // Khoảng cách giữa Select và Button
                            }}
                        >
                            <AddIcon sx={{fontSize: 15}}/>
                        </Button>
                    </Tooltip>
                </Box>
            )}
        </Box>

    )
}

export default headerLopHoc;