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
  const currentUser = 'John Doe'; // Replace with session data if available

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxKMUFxVGRXNEVJZWd3UUt5em05bCJ9.eyJnaXZlbl9uYW1lIjoiUmlzaHUiLCJmYW1pbHlfbmFtZSI6IkFuYW5kIiwibmlja25hbWUiOiJhbmFuZC5yaXNodTA3IiwibmFtZSI6IlJpc2h1IEFuYW5kIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xXMjJ0WkxpMUtaMkZNcm1TenB2RDN0ZjlCSi1VcmhFM2U2aXBsYjhlUk0wa082dz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI1LTA0LTE4VDA4OjU3OjU3LjA1OFoiLCJlbWFpbCI6ImFuYW5kLnJpc2h1MDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LW12am9ra21qaWZ3YTUwbGkudXMuYXV0aDAuY29tLyIsImF1ZCI6InlWNWZsbFhkZWZWb2NUdTROVHc1a3VEU2ZmcGxMTUJFIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTI2MjUxODA5MDc5NTk1OTY5NjkiLCJpYXQiOjE3NDQ5NjY2NzgsImV4cCI6MTc0NTAwMjY3OCwic2lkIjoia1c1ekNOdkRSajF4M1FBT2M1c2c2WWNnUGhHcUVvQUYiLCJub25jZSI6IkI5dFNnTl9zR3gtcnQ4dXNQb0Y1YTQtTmJ3cVlkcmFDMkN2bWRyR2Q2elEifQ.CyvQgLo5-jT8_VoSDlR5YKa7HxFrcvaXn5tbWxBKf29xF1Pea3QuJEeGllvfD9b3SooojBUqk6Ji_uCuXgqflCZmC-oO8pGkpehm0UaHyNFIcS9wHugJJb8NyY7VcjjAkCFu2PRoBMvxkD9DR2vS-dcjqbllevRu57XH-_ePQpDzJlJs8X32IZhWBscr_O0EF0_8NyocB47_VEqBcLOn2ak5OsaNFKBowe9s6ItU0Tpda7RJj7R9vKtXnNkf9a5UIGyEMKGqj_r7izUyl95odADCXAHpmauGGSacohe8_uTZdMF3g8QKEETsSIiptj6b5Oxu82x9U5cYNmeYlpDJHg'
        const res = await api.get(`/forums/${id}/comments`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
                      {comment.userId} • {new Date(comment.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleDelete(comment.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
