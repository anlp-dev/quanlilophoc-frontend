import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
    Avatar,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledCard = styled(Card)(({theme}) => ({
    borderRadius: "16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
}));

// Styled Button
const StyledButton = styled(Button)(({theme}) => ({
    background: 'linear-gradient(45deg, #ff758c, #ff7eb3)',
    color: '#fff',
    padding: '10px 20px',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '30px',
    boxShadow: '0 4px 12px rgba(255, 117, 140, 0.5)',
    '&:hover': {
        background: 'linear-gradient(45deg, #ff7eb3, #ff758c)',
    },
}));

const accountProfileInfo = ({account}) => {
    return (
    <>

            <CardContent>
                <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                    Thông tin người dùng
                </Typography>
                <Divider/>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Số điện thoại:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{color: "#555"}}>
                            {account?.teacherId?.phoneNumber ||
                                account?.studentId?.phoneNumber ||
                                "Chưa cập nhật"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Địa chỉ:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{color: "#555"}}>
                            {account?.teacherId?.address ||
                                account?.studentId?.address ||
                                "Chưa cập nhật"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Ngày sinh:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{color: "#555"}}>
                            {account?.teacherId?.dateOfBirth ||
                            account?.studentId?.dateOfBirth
                                ? new Date(
                                    account?.teacherId?.dateOfBirth ||
                                    account?.studentId?.dateOfBirth
                                ).toLocaleDateString("vi-VN")
                                : "Chưa cập nhật"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Giới tính:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{color: "#555"}}>
                            {account?.teacherId?.gender ||
                                account?.studentId?.gender ||
                                "Chưa cập nhật"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Chuyên môn:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" sx={{color: "#555"}}>
                            {account?.teacherId?.specialization || "Chưa cập nhật"}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

    </>
)
    ;
};

export default accountProfileInfo;
