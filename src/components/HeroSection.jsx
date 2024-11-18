// src/components/HeroSection.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
                color: '#fff',
                py: 8,
            }}
        >
            <Typography variant="h3" gutterBottom>
                Online learning platform
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 500, mb: 4 }}>
                Build skills with courses, certificates, and degrees online from world-class universities and companies.
            </Typography>
            <Button variant="contained" color="warning" size="large">
                Join For Free
            </Button>
        </Box>
    );
};

export default HeroSection;
