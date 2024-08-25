import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.post('https://zuai-assignment-backend-81it.onrender.com/posts', { title, content })
            .then(response => {
                setLoading(false);
                navigate(`/posts/${response.data.post.id}`);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            <TextField
                label="Content"
                variant="outlined"
                fullWidth
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                multiline
                rows={4}
                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <Box sx={{ mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Create Post'}
                </Button>
            </Box>
        </Box>
    );
}

export default NewPostForm;

