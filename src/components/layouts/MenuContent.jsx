import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Link, useLocation} from "react-router-dom";
import RoomIcon from '@mui/icons-material/Room';
import {Path} from '../../enums/Path.jsx';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AbcIcon from '@mui/icons-material/Abc';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';

const mainListItems = [
    {
        text: 'Trang chủ',
        icon: <HomeRoundedIcon/>,
        link: Path.HOME,
        role: ['admin', 'teacher', 'student']
    },
    {
        text: 'Lớp học',
        icon: <ClassIcon/>,
        link: Path.CLASS,
        role: ['admin', 'teacher', 'student'],
    },
    {
        text: 'Thống kê',
        icon: <DashboardIcon/>,
        link: Path.DASHBOARD,
        role: ['admin']
    },
    {
        text: 'Analytics',
        icon: <AnalyticsRoundedIcon/>,
        role: ['admin', 'teacher'],
        children: [
            {text: 'Tổng quan', link: '/analytics/overview'},
            {text: 'Chi tiết', link: '/analytics/detail'},
        ]
    },
    {
        text: 'Quản lý hệ thống',
        icon: <SettingsSystemDaydreamIcon/>,
        role: ['admin'],
        children: [
            {text: 'Người dùng',icon: <AccountCircleIcon/> ,link: '/admin/user'},
            {text: 'Vai trò',icon: <AbcIcon/> , link: '/admin/roles'},
            {text: 'Thống kê lượt request',icon: <AnalyticsIcon/> , link: '/admin/request'},
            {text: 'Thống kê và báo cáo',icon: <ReportIcon/> , link: '/admin/report'},
            {text: 'Cấu hình hệ thống',icon: <SettingsIcon/> , link: '/admin/config'},
            {text: 'Kiểm soát hệ thống',icon: <ControlCameraIcon/> , link: '/admin/control'},
            {text: 'Quản lí quyền truy cập',icon: <ManageAccountsIcon/> , link: '/admin/manage-request'},
            {text: 'Bảo trì',icon: <SafetyCheckIcon/> , link: '/admin/safe'},
            {text: 'Bảo mật',icon: <AdminPanelSettingsIcon/> , link: '/admin/security'},
        ]
    },
    {
        text: 'Tasks',
        icon: <AssignmentRoundedIcon/>,
        role: ['teacher', 'student']
    },
];

export default function MenuContent(role) {
    const location = useLocation();
    const [open, setOpen] = React.useState({});

    const handleClick = (index) => {
        setOpen((prevState) => ({...prevState, [index]: !prevState[index]}));
    };

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between', color: 'black'}}>
            <List dense>
                {mainListItems.map((item, index) => {
                    if (role && item.role && item.role.includes(role.role)) {
                        return (
                            <React.Fragment key={index}>
                                <ListItem disablePadding sx={{display: 'block'}}>
                                    <ListItemButton
                                        selected={location.pathname === item.link}
                                        component={Link}
                                        to={item.link}
                                        onClick={() => handleClick(index)}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                        {item.children && (open[index] ? <ExpandLess/> : <ExpandMore/>)}
                                    </ListItemButton>
                                </ListItem>
                                {item.children && (
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children.map((child, childIndex) => (
                                                <ListItemButton
                                                    key={childIndex}
                                                    sx={{pl: 4}}
                                                    component={Link}
                                                    to={child.link}
                                                    selected={location.pathname === child.link}
                                                >
                                                    <ListItemIcon>{child.icon}</ListItemIcon>
                                                    <ListItemText primary={child.text}/>
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        )
                    } else return null;
                })}
            </List>
        </Stack>
    );
}