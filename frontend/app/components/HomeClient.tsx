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
} from '@mui/material';
import { useForum } from '@/context/ForumContext';
import { useEffect } from 'react';

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
  forumList,
}: {
  user: any;
  forumList: Forum[];
}) {
  const { setForum } = useForum();
  const router = useRouter();
  console.log('====', user, forumList)

  const handleCardClick = (item: Forum) => {
    setForum({ id: item.id, title: item.title, desc: item.description });
    router.push(`/discussion/${item.id}`);
  };

  const handleLogout = () => {
    window.location.href = '/auth/logout';
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
        <Typography variant="h4">Welcome, {user?.name}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Forum Discussions
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 4,
          }}
        >
          {forumList.map((item) => (
            <Card
              key={item?.id}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { boxShadow: 4 },
              }}
              onClick={() => handleCardClick(item)}
            >
              <CardContent>
                <Typography variant="h6">{item?.title}</Typography>
                <Typography>{`${item?.userName} posted on ${item?.createdAt}`}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
