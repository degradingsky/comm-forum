'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent } from '@mui/material';

export default function Home() {
  const router = useRouter();

  const forumList = [
    { id: '1', title: 'forum1', desc: 'this is forum1', name: 'Rishu', createdAt: '15 Apr, 2025' },
    { id: '2', title: 'forum2', desc: 'this is forum2', name: 'User2', createdAt: '15 Apr, 2025' },
    { id: '3', title: 'forum3', desc: 'this is forum3', name: 'User3', createdAt: '15 Apr, 2025' },
  ];

  const handleCardClick = (id: string) => {
    router.push(`/discussion/${id}`);
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Forum
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4">
          Forum Discussions
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
          {forumList.map((item) => (
            <Card
              key={item.id}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { boxShadow: 4 },
              }}
              onClick={() => handleCardClick(item.id)}
            >
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{`${item?.name} posted on ${item.createdAt}`}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
