import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

function About() {
    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4, color: 'white', fontFamily:'Helvetica' }}>
                <Typography variant="h4" component="h1" sx={{fontWeight:'800'}} gutterBottom>
                    About Me
                </Typography>
                <Typography variant="body1" paragraph>
                    Hello! I'm Sushobhit Dhara, a passionate Full Stack Developer from Maharashtra, India.
                    I have recently completed the Full Stack Developer Course from the NxtWave CCBP 4.0 Certification Program.
                    I love building interactive, responsive, and user-friendly web applications.
                </Typography>
                <Typography variant="body1" paragraph>
                    In addition to my technical skills, i am proficient in HTML, CSS, JavaScript, and frameworks like Bootstrap, MaterialUI and ReactJS. I also have learned backend technologies such as Node.js and Python, along with SQL and MOngoDB for database management. 
                    I enjoy combining my creativity and technical expertise to solve problems and build solutions that make a difference.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you'd like to see more of my work, please check out my portfolio:
                </Typography>
                <Typography variant="body1" paragraph>
                    <Link href="https://portfolio-sushobhit.vercel.app/" target="_blank" rel="noopener" underline="hover" sx={{color:'yellow', fontWeight:'900'}}>
                    https://portfolio-sushobhit.vercel.app/
                    </Link>
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for visiting my blog. I hope you enjoy reading the posts as much as I enjoy writing them!
                </Typography>
            </Box>
        </Container>
    );
}

export default About;
