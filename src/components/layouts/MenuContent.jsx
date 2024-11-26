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
import {PATH} from '../../enums/path.jsx';

const mainListItems = [
    {
        text: 'Trang chủ',
        icon: <HomeRoundedIcon/>,
        link: PATH.HOME,
        role: ['admin', 'teacher', 'student']
    },
    {
        text: 'Lớp học',
        icon: <ClassIcon/>,
        link: PATH.CLASS,
        role: ['admin', 'teacher', 'student'],
        children: [
            {text: 'Lớp 10A1', icon: <RoomIcon/>, link: '/class/10A1'},
            {text: 'Lớp 11B2', icon: <RoomIcon/>, link: '/class/11B2'},
        ]
    },
    {
        text: 'Thống kê',
        icon: <DashboardIcon/>,
        link: PATH.DASHBOARD,
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
        text: 'Người dùng',
        icon: <PeopleRoundedIcon/>,
        role: ['admin'],
        children: [
            {text: 'Giáo viên', link: '/users/teacher'},
            {text: 'Học sinh', link: '/users/student'},
        ]
    },
    {
        text: 'Tasks',
        icon: <AssignmentRoundedIcon/>,
        role: ['teacher', 'student']
    },
];

const secondaryListItems = [
    {
        text: 'Settings',
        icon: <SettingsRoundedIcon/>,
        children: [
            {text: 'Tài khoản', link: '/settings/account'},
            {text: 'Thông báo', link: '/404'},
        ]
    },
    {text: 'About', icon: <InfoRoundedIcon/>},
    {text: 'Feedback', icon: <HelpRoundedIcon/>},
];

export default function MenuContent(role) {
    const location = useLocation();
    const [open, setOpen] = React.useState({});

    const handleClick = (index) => {
        setOpen((prevState) => ({...prevState, [index]: !prevState[index]}));
    };

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
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

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton onClick={() => handleClick(index + mainListItems.length)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                                {item.children && (open[index + mainListItems.length] ? <ExpandLess/> : <ExpandMore/>)}
                            </ListItemButton>
                        </ListItem>
                        {item.children && (
                            <Collapse in={open[index + mainListItems.length]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child, childIndex) => (
                                        <ListItemButton
                                            key={childIndex}
                                            sx={{pl: 4}}
                                            component={Link}
                                            to={child.link}
                                            selected={location.pathname === child.link}
                                        >
                                            <ListItemText primary={child.text}/>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Stack>
    );
}