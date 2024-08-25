import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';

function EditPostForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://zuai-assignment-backend-81it.onrender.com/posts/${id}`)
            .then(response => {
                setTitle(response.data.post.title);
                setContent(response.data.post.content);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load post details. Please try again later. 😞');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.put(`https://zuai-assignment-backend-81it.onrender.com/posts/${id}`, { title, content })
            .then(() => {
                setLoading(false);
                navigate(`/posts/${id}`);
            })
            .catch(error => {
                setError('Failed to update post. Please try again later. 😞');
                setLoading(false);
            });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 3,
                fontFamily: 'Helvetica',
                color: 'white',
                '& .MuiTextField-root': { mb: 2 },
                '& .MuiButton-root': { mt: 2 }
            }}
        >
            <TextField
                label="Title ✏️"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            <TextField
                label="Content 📝"
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
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ fontFamily: 'Helvetica' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Update Post 🔄'}
                </Button>
            </Box>
        </Box>
    );
}

export default EditPostForm;
