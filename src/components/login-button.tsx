'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import UserAvatar from './user-avatar';

const LoginButton = () => {
  const { user, login, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (user) {
    return <UserAvatar user={user} />;
  }

  return <Button onClick={login}>Login</Button>;
};

export default LoginButton;
