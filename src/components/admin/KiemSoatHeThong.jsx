import { Card, CardContent, Typography, Button } from '@mui/material';

const SystemControl = () => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Kiểm Soát Hệ Thống
                </Typography>
                <Button variant="contained" color="error">Dừng Hệ Thống</Button>
            </CardContent>
        </Card>
    );
};

export default SystemControl;
