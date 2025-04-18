'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '@/lib/axios';
import { useForum } from '@/context/ForumContext';

export default function DiscussionPage() {
  const { id } = useParams();
  const { forum } = useForum();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/forums/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentObj = {
      content: newComment,
    };

    try {
      const res = await api.post(`/forums/${id}/comments`, commentObj);
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await api.delete(`/forums/${id}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const getUserId = () => JSON.parse(localStorage.getItem('user')!).userId;

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>{forum?.title}</Typography>
      <Typography variant="body1" gutterBottom>{forum?.desc}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Add a Comment</Typography>
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

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {comments.map((comment) => (
            <Card key={comment.id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {comment.userId} • {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                  {comment.userId === getUserId() && <IconButton onClick={() => handleDelete(comment.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
