import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";

const Box = styled(MuiBox)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100vh',
    position: 'sticky',
    top: 0,
    width: 250,
    display: 'flex',
    flexDirection: 'column',
}));

const MainTab = () => {
    return (
        <Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AnalyticsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clients" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Feedback" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Button variant="contained" fullWidth>
                    Get the discount
                </Button>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Riley Carter" src="/path/to/your/avatar.jpg" />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1">Riley Carter</Typography>
                        <Typography variant="body2" color="text.secondary">
                            riley@email.com
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MainTab;