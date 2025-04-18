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

  let userDetails = {
    token: session.tokenSet.idToken!,
    userId: session.user.sub,
    userName: session.user.name!,
    expiryAt: session.tokenSet.expiresAt
  }

  
  try {
    const res = await api.get('/forums', {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    });
    forumList = res.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
  }

  return <HomeClient user={userDetails} forumList={forumList} />;
}
