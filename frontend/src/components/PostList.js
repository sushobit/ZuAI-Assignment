import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, CircularProgress, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const HorizontalList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
    gap: theme.spacing(2),
}));

const Card = styled(ListItem)(({ theme }) => ({
    maxWidth: 'fit-content',
    borderRadius: '20px',
    color: 'white',
    backgroundColor: '#282c347f',
    boxShadow: theme.shadows[3],
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
        margin: theme.spacing(1, 0),
    },
    '& .MuiListItemText-primary': {
        color: 'white',
    },
    '& .MuiListItemText-secondary': {
        color: 'white',
    },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-input': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '50px',
        borderColor: '#d1d1d1',
        backgroundColor: '#eaf6ff',
        '& fieldset': {
            borderColor: '#d1d1d1',
        },
        '&:hover fieldset': {
            borderColor: '#00aaff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00aaff',
        },
    },
    '& .MuiInputBase-input': {
        fontSize: '18px',
    },
}));

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://zuai-assignment-backend-81it.onrender.com/posts')
            .then(response => {
                setPosts(response.data.posts);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <CircularProgress />;

    if (error) return <p>Error loading posts: {error.message} ⚠️</p>;

    return (
        <div>
            <SearchBar
                placeholder="🔍 Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    outline: 'none',
                    width: '80%',
                    maxWidth: '600px',
                    padding: '12px',
                    borderRadius: '50px',
                    backgroundColor: '#eaf6ff',
                    fontSize: '18px',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease',
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#d1d1d1';
                    e.target.style.backgroundColor = '#eaf6ff';
                }}
            />
            {filteredPosts.length === 0 ? (
                <Typography variant="h6">No posts found 😔</Typography>
            ) : (
                <HorizontalList>
                    {filteredPosts.map(post => (
                        <Card key={post.id} component={Link} to={`/posts/${post.id}`} button>
                            <ListItemText
                                primary={<Typography variant="h6" component="span" fontWeight="500" fontSize='30px' fontFamily='Helvetica'>{post.title} 📚</Typography>}
                                secondary={<Typography marginTop='20px' fontFamily='Helvetica'>{post.excerpt} ✨</Typography>}
                            />
                        </Card>
                    ))}
                </HorizontalList>
            )}
        </div>
    );
}

export default PostList;
