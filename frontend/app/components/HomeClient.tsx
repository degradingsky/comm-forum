'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForum } from '@/context/ForumContext';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import NewDiscussionDialog from './NewDiscussionDialog';
import axiosInstance from '@/lib/axios';


type Forum = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
  userName: string;
  createdAt: string;
};

export default function HomeClient({
  user,
  forumList: initialForumList,
}: {
  user: {
    token: string;
    userId: string;
    userName: string;
    expiryAt: number;
  };
  forumList: Forum[];
}) {
  const { setForum } = useForum();
  const router = useRouter();
  const [forums, setForums] = useState<Forum[]>(initialForumList);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<Forum | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    const expiryTime =  user.expiryAt * 1000;
    const currentTime = Date.now();
    const timeoutMs = expiryTime - currentTime - 60 * 1000;
    setTimeout(() => {
      console.log('[AutoLogout] Logging out...');
      window.location.href = '/auth/logout';
    }, timeoutMs);
  }, []);

  const fetchForums = async () => {
    try {
      const res = await api.get('/forums');
      setForums(res.data);
    } catch (err) {
      console.error('Error fetching updated forums:', err);
    }
  };

  const handleCardClick = (item: Forum) => {
    setForum({ id: item.id, title: item.title, desc: item.description, });
    router.push(`/discussion/${item.id}`);
  };

  const handleLogout = () => {
    window.location.href = '/auth/logout';
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/forums/${deleteId}`);
      setSnackbar({ open: true, message: 'Deleted successfully!', severity: 'success' });
      setDeleteId(null);
      fetchForums();
    } catch (err) {
      console.error('Delete error', err);
      setSnackbar({ open: true, message: 'Failed to delete.', severity: 'error' });
    }
  };

  return (
    <>
      
      <AppBar position="static">
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
  
    <Typography variant="h6" sx={{ flex: 1 }}>
      Community Forum
    </Typography>

    <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
      Welcome, {user.userName}
    </Typography>

    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  </Toolbar>
</AppBar>


<Box sx={{ padding: 4 }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Typography variant="h5">Forum Discussions</Typography>
    <Button variant="contained" onClick={() => setOpenDialog(true)}>
      Start New Discussion
    </Button>
  </Box>


      
        

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
          {forums.map((item) => (
            <Card
              key={item.id}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { boxShadow: 4 },
              }}
            >
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box onClick={() => handleCardClick(item)} sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>{`${item.userName} posted on ${new Date(item.createdAt).toLocaleString()}`}</Typography>
                </Box>
                {item.userId === user.userId && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => { setEditData(item); setOpenDialog(true); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteId(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <NewDiscussionDialog
        open={openDialog}
        onClose={() => { setOpenDialog(false); setEditData(null); }}
        onSuccess={fetchForums}
        editData={editData}
      />

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete this discussion?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
