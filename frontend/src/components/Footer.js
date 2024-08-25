import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#3c4547',
                position: 'fixed',
                color: 'white',
                bottom: 0,
                width: '100%',
                left: 0, 
            }}
        >
            <Typography variant="body2" color="white" gutterBottom>
                &copy; 2024 Blog Application
            </Typography>
        </Box>
    );
}

export default Footer;
