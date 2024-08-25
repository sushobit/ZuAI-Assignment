import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';
import axios from 'axios';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://zuai-assignment-backend-81it.onrender.com/comments/posts/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments', error);
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <Container>
            <Typography variant="h6">Comments</Typography>
            <List>
                {comments.map(comment => (
                    <ListItem key={comment.id}>
                        <ListItemText
                            primary={comment.author}
                            secondary={comment.content}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default CommentList;
