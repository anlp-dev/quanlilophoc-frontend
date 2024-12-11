import { Card, CardContent, Typography, Button } from '@mui/material';

const Maintenance = () => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Bảo Trì
                </Typography>
                <Button variant="contained" color="error">Bắt Đầu Bảo Trì</Button>
            </CardContent>
        </Card>
    );
};

export default Maintenance;
