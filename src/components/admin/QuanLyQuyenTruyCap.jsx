import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const AccessControl = () => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Quản Lí Quyền Truy Cập
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" fullWidth>Quản lý Quyền</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="error" fullWidth>Gỡ Quyền</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AccessControl;
