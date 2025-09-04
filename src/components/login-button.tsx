'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import UserAvatar from './user-avatar';
import Link from 'next/link';

const LoginButton = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (user) {
    return <UserAvatar user={user} />;
  }

  return <Button asChild><Link href="/login">Login</Link></Button>;
};

export default LoginButton;
