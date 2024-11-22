import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AccountProfileInfo = ({ account }) => {
    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText primary="Họ và tên:" secondary={account.fullname} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email:" secondary={account.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Số điện thoại:" secondary={account.phoneNumber || 'Chưa cập nhật'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Địa chỉ:" secondary={account.address || 'Chưa cập nhật'} />
                </ListItem>
            </List>
        </div>
    );
};

export default AccountProfileInfo;