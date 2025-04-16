'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DiscussionPage() {
  const { id } = useParams();

  const discussion = {
    title: `Forum Discussion #${id}`,
    desc: `This is the description for discussion ${id}.`,
  };

  const currentUser = 'John Doe'; // Assume logged-in user name

  const [comments, setComments] = useState([
    { name: 'Alice', comment: 'This is really interesting!', date: '2025-04-15' },
    { name: 'Bob', comment: 'I agree with the points here.', date: '2025-04-16' },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentObj = {
      name: currentUser,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    await mockPostComment(commentObj);

    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  const handleDelete = (index: number) => {
    setComments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const commentToEdit = comments[index];
    setNewComment(commentToEdit.comment);
    setComments((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulated API call
  const mockPostComment = async (comment: any) => {
    return new Promise((resolve) => {
      console.log('Mock API: Posting comment →', comment);
      setTimeout(resolve, 300); // Simulate delay
    });
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {discussion.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {discussion.desc}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Add a Comment
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label="Write your comment"
          multiline
          minRows={3}
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Post Comment
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment, idx) => (
          <Card key={idx} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {comment.name} • {comment.date}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {comment.comment}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEdit(idx)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(idx)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
