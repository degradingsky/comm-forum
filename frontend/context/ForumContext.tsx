'use client';

import { createContext, useContext, useState } from 'react';

type ForumContextType = {
  forum: { id: string; title: string; desc: string } | null;
  setForum: (forum: { id: string; title: string; desc: string }) => void;
  clearForum: () => void;
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider = ({ children }: { children: React.ReactNode }) => {
  const [forum, setForumState] = useState<ForumContextType['forum']>(null);

  const setForum = (forumData: { id: string; title: string; desc: string }) => {
    setForumState(forumData);
  };

  const clearForum = () => {
    setForumState(null);
  };

  return (
    <ForumContext.Provider value={{ forum, setForum, clearForum }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};
