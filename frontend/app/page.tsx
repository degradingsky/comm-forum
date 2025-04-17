import { auth0 } from "@/lib/auth0"
import { redirect } from 'next/navigation';
import HomeClient from './components/HomeClient';
import api from "@/lib/axios";

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect('/auth/login');
  }

  let forumList = [];
  console.log('====>>>', session)

  let token = session.tokenSet.idToken;

  // sessionStorage.setItem('accessToken', token);
  // sessionStorage.setItem('userName', session?.user?.name! ?? "name-not-found");
  
  try {
    const res = await api.get('/forums', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    forumList = res.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
  }

  return <HomeClient user={session.user} forumList={forumList} />;
}
