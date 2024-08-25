import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import backgroundImage from './photo-teal-orange-gradient-abstract-blurry-colorful-background-phone-backgrounds_1050153-72494.jpg'; // Adjust the path to your image


const pulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.6;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.9;
    }
    100% {
        transform: scale(1);
        opacity: 0.6;
    }
`;


const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

function Loading() {
    const [color, setColor] = useState('#6200ea'); 

    useEffect(() => {
        
        const colors = ['#6200ea', '#03dac5', '#018786', '#6200ea'];
        let index = 0;
        const intervalId = setInterval(() => {
            setColor(colors[index]);
            index = (index + 1) % colors.length;
        }, 1500); 

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                color: 'white', 
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: 0.4,
                    animation: `${pulse} 2s infinite`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white', 
                }}
            >
                <CircularProgress
                    size={80}
                    sx={{
                        color: color,
                        position: 'absolute',
                        animation: `${rotate} 1.5s linear infinite`,
                    }}
                />
            </Box>
            <Typography variant="h5" color="textPrimary" sx={{ mb: 1, color: 'white',  }}>
                Loading New Blogs...
            </Typography>
            <Typography variant="body1" color="white">
                We're retrieving the latest updates for you. Thanks for your patience!
            </Typography>
        </Box>
    );
}

export default Loading;
