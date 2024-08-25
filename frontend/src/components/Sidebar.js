import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Divider, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Desktop Sidebar */}
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            backgroundColor: 'transparent',
                            color: '#fff',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <div style={{ width: 240, height: '100%', display: 'flex', flexDirection: 'column', }}>
                        <Typography variant="h6" component="div" sx={{fontFamily:'Helvetica', padding: 6, color: '#fff', fontSize:'40px', fontWeight:'900' }}>
                         <ListItem button component={Link} to="/" sx={{ color: '#fff', '&:hover': { textDecoration: 'underline' } }}>
                                <ListItemIcon sx={{ color: '#fff' }}>
                                ZuAI
                                </ListItemIcon>
                            </ListItem>
                        </Typography>
                        <Divider />
                        <List>
                            <ListItem button component={Link} to="/" sx={{ color: '#fff', '&:hover': { backgroundColor: '#5b7ad6' } }}>
                                <ListItemIcon sx={{ color: '#fff' }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" primaryTypographyProps={{ fontSize: '1.1rem', fontFamily:'Helvetica' }} />
                            </ListItem>
                            <ListItem button component={Link} to="/new-post" sx={{ color: '#fff', '&:hover': { backgroundColor: '#5b7ad6' } }}>
                                <ListItemIcon sx={{ color: '#fff' }}>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Post" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                            </ListItem>
                            <ListItem button component={Link} to="/about" sx={{ color: '#fff', '&:hover': { backgroundColor: '#5b7ad6' } }}>
                                <ListItemIcon sx={{ color: '#fff' }}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </Hidden>


            {/* Mobile Menu Button */}
            <Hidden mdUp>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1201 }}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>

            {/* Main Content Area */}
            <main style={{ flexGrow: 1, padding: 24, marginLeft: { xs: 0, md: 240 }, transition: 'margin-left 0.3s' }}>
                <Typography variant="h4" paddingLeft={5} color='#fff' fontFamily='Helvetica'>Blog List</Typography>
                {/* Add your main content here */}
            </main>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#282c34',
                        color: '#fff',
                    },
                }}
                variant="temporary"
                ModalProps={{ keepMounted: true }}
            >
                <div style={{ width: 240, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="div" sx={{ padding: 2, color: '#61dafb' }}>
                        Blog
                    </Typography>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/" onClick={toggleDrawer} sx={{ color: '#fff', '&:hover': { backgroundColor: '#61dafb' } }}>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/new-post" onClick={toggleDrawer} sx={{ color: '#fff', '&:hover': { backgroundColor: '#61dafb' } }}>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Post" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/about" onClick={toggleDrawer} sx={{ color: '#fff', '&:hover': { backgroundColor: '#61dafb' } }}>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" primaryTypographyProps={{ fontSize: '1.1rem' }} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Sidebar;
