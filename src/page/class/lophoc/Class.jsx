import React, {useEffect, useState} from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar,
    Chip,
    Slide,
    Paper,
    useTheme, MenuItem, Select,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {styled} from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import ModalAddClass from "../../../components/modals/ModalAddClass.jsx";
import crudClassService from "../../../services/lophoc/CrudClassService.jsx"
import HeaderLopHoc from "../../../components/headers/lophoc/HeaderLopHoc.jsx"
import CodeIcon from '@mui/icons-material/Code';
import ClassIcon from "@mui/icons-material/Class";
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Navigate, useNavigate} from "react-router-dom";

const StyledCard = styled(Card)(({color}) => ({
    borderLeft: `8px solid ${color}`,
    width: 350,
    borderRadius: "15px",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const Class = () => {
    const [classesData, setClassesData] = useState([]);
    const theme = useTheme();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selected, setSelected] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectClassEdit, setSelectClassEdit] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        try {
            fetchDataClass();
        } catch (e) {
            console.log(e.message);
        }
    }, []);

    const fetchDataClass = async () => {
        try {
            const data = await crudClassService.getAll();
            setClassesData(data.data);
            setFilterData(data.data)
        } catch (e) {
            console.log(e);
        } finally {

        }
    }


    const handleOnChangeSelect = (e) => {
        const set = e.target.value;
        setSelected(set)
        if (set === 0) {
            setFilterData(classesData)
        } else {
            const filter = classesData.filter((s) => s.khoi === set);
            setFilterData(filter);
        }
    };

    const handleOnClick = () => {
        setIsEdit(false)
        setOpenModalAdd(true);
    }

    const handleOnClickSave = (classSelect) => {
        setSelectClassEdit(classSelect);
        setIsEdit(true)
        setOpenModalAdd(true);
    }

    const handleCloseModal = () => {
        fetchDataClass();
        setOpenModalAdd(false);
    }

    const handleOpenDetail = () => {
        navigate('/class/detail')
    }

    return (
        <>
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
                    <HeaderLopHoc selected={selected} handleOnChangeSelect={handleOnChangeSelect}
                                  handleOnClick={handleOnClick}/>

                    {filterData.length === 0 ? (
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "60vh"}}>
                            <Typography variant="h6" color="text.secondary" sx={{mr: 2}}>
                                Chưa có lớp học nào
                            </Typography>
                            <Avatar sx={{bgcolor: "#ccc"}}><SchoolIcon/></Avatar>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filterData.map((classData, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <StyledCard color={classData.color} elevation={4}>
                                        <CardContent>
                                            <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
                                                <Avatar sx={{bgcolor: classData.color, mr: 2}}>
                                                    <ClassIcon/>
                                                </Avatar>
                                                <Typography variant="h6" sx={{fontWeight: "bold", marginRight: "auto"}}>
                                                    {classData.name}
                                                </Typography>
                                                <Typography variant="h6" sx={{fontWeight: "bold"}}>
                                                    <EditNoteIcon onClick={() => handleOnClickSave(classData)}/>
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{mb: 1}}>
                                                <Chip
                                                    icon={<PeopleIcon/>}
                                                    label={`Học sinh: ${classData.students.length}`}
                                                    sx={{mr: 1}}
                                                    color="primary"
                                                />
                                                <Chip
                                                    icon={<CodeIcon/>}
                                                    label={`Mã lớp: ${classData.ma}`}
                                                    sx={{mr: 1}}
                                                    color="secondary"
                                                />
                                                <Chip
                                                    icon={<SchoolIcon/>}
                                                    label={`Khối: ${classData.khoi}`}
                                                    sx={{mt: 1, mr: 1}}
                                                    color="warning"
                                                />
                                                <Chip
                                                    icon={<SchoolIcon/>}
                                                    label={`Giáo viên: ${classData.teacher}`}
                                                    sx={{mt: 1}}
                                                    color="success"
                                                />
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" variant="contained" onClick={handleOpenDetail}>
                                                Xem chi tiết
                                            </Button>
                                            <Button size="small" variant="outlined">
                                                Gửi thông báo
                                            </Button>
                                        </CardActions>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <ModalAddClass openData={openModalAdd} onClose={handleCloseModal} editMode={isEdit}
                                   classDataEdit={selectClassEdit}/>
                </Paper>
            </Slide>
        </>
    );
};

export default Class;
