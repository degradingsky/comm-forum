'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

type NewDiscussionDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: {
    id: string;
    title: string;
    description: string;
  } | null;
};

export default function NewDiscussionDialog({
  open,
  onClose,
  onSuccess,
  editData = null,
}: NewDiscussionDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editData, open]);

  const handleSubmit = async () => {
    setDisable(true);
    const validationErrors = {
      title: title.trim() === '' ? 'Title is required' : '',
      description: description.trim() === '' ? 'Description is required' : '',
    };
  
    setErrors(validationErrors);
  
    if (validationErrors.title || validationErrors.description) return;
  
    try {
      if (editData?.id) {
        await api.patch(`/forums/${editData.id}`, {
          title,
          description,
        });
        setSnackbar({ open: true, message: 'Forum updated successfully!', severity: 'success' });
      } else {
        await api.post('/forums', {
          title,
          description,
          tags: [],
        });
        setSnackbar({ open: true, message: 'Forum created successfully!', severity: 'success' });
      }
      setDisable(false);
      onSuccess();
      onClose();
      setTitle('');
      setDescription('');
      setErrors({ title: '', description: '' });
  
    } catch (error) {
      setSnackbar({ open: true, message: editData ? 'Failed to update forum' : 'Failed to create forum', severity: 'error' });
    }
  };
  

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{editData ? 'Edit Discussion' : 'Start New Discussion'}</DialogTitle>
        <DialogContent sx={{ overflowY: 'visible', display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={disable}>
            {editData ? 'Update' : 'Create'}
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
