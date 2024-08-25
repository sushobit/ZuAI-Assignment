import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress, Button, Box, Alert, Container, TextField } from '@mui/material';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://zuai-assignment-backend-81it.onrender.com/posts/${id}`)
            .then(response => {
                setPost(response.data.post);
                setComments(response.data.comments);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load post. Please try again later. 😢');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`https://zuai-assignment-backend-81it.onrender.com/posts/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch(error => {
                setError('Failed to delete post. Please try again later. 😔');
                setLoading(false);
            });
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') return;

        axios.post(`https://zuai-assignment-backend-81it.onrender.com/posts/${id}/comments`, { content: newComment })
            .then(response => {
                setComments([...comments, response.data.comment]);
                setNewComment('');
            })
            .catch(error => {
                setError('Failed to add comment. Please try again later. 😓');
            });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container sx={{color: 'white', fontFamily:'Helvetica'}}>
            <Typography variant="h4" component="h1" gutterBottom>
                {post.title} 📜
            </Typography>
            <Typography variant="body1" paragraph>
                {post.content}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                    sx={{ mr: 2 }}
                >
                    Edit ✏️
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Delete 🗑️'}
                </Button>
            </Box>
            <Box sx={{ mt: 4, fontFamily:'Helvetica' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Comments 💬
                </Typography>
                {comments.length === 0 ? (
                    <Typography>No comments yet. 😔</Typography>
                ) : (
                    comments.map(comment => (
                        <Box key={comment.id} sx={{ mb: 2, p: 2, border: '3px solid #ddd', borderRadius: 5 }}>
                            <Typography>{comment.content}</Typography>
                        </Box>
                    ))
                )}
            </Box>
            <Box sx={{ mt: 4, fontFamily:'Helvetica', }}>
                <TextField
                    label="Add a comment ✍️"
                    multiline
                    rows={4}
                    fullWidth
                    value={newComment}
                    onChange={handleCommentChange}
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    sx={{ mt: 2 }}
                >
                    Submit 🚀
                </Button>
            </Box>
        </Container>
    );
}

export default PostDetail;
