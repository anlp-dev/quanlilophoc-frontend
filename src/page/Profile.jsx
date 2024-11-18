import * as React from 'react';
import {
    Avatar,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import {useEffect, useState} from "react";
import userService from '../services/userService.jsx'

const Profile = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function fetchData(){
            try{
                const token = localStorage.getItem('token')
                const data = await userService.loadDataUser(token);
                setUser(data.data);
            }catch (e) {
                throw new Error(e);
            }
        }
        fetchData();

    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Avatar
                                alt="Profile Picture"
                                src="/path/to/your/profile-picture.jpg"
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                {user?.fullname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                Software Engineer
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                {user?.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.username}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                About Me
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Maecenas sed diam eget risus varius blandit sit amet non magna.
                                Nulla vitae elit libero, a pharetra augue.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;