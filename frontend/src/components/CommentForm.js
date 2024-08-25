import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

function CommentForm({ postId, onCommentAdded }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://zuai-assignment-backend-81it.onrender.com/comments', { postId, author, content });
            setAuthor('');
            setContent('');
            onCommentAdded(); // Notify parent to refresh comments
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment. Please try again.');
        }
    };

    return (
        <Container>
            <Typography variant="h6">Add a Comment</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
}

export default CommentForm;
