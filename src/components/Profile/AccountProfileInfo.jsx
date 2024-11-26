import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {useEffect, useState} from "react";

const accountProfileInfo = ({ account }) => {

    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText primary="Họ và tên:" secondary={account?.fullname} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email:" secondary={account?.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Số điện thoại:" secondary={account?.teacherId?.phoneNumber || account?.studentId?.phoneNumber || 'Chưa cập nhật'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Địa chỉ:" secondary={account?.teacherId?.address || account?.studentId?.address || 'Chưa cập nhật'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Ngày sinh:" secondary={account?.teacherId?.dateOfBirth || account?.studentId?.dateOfBirth || 'Chưa cập nhật'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Giới tính:" secondary={account?.teacherId?.gender || account?.studentId?.gender || 'Chưa cập nhật'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Chuyên môn:" secondary={account?.teacherId?.specialization || 'Chưa cập nhật'} />
                </ListItem>
            </List>
        </div>
    );
};

export default accountProfileInfo;