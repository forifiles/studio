'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { User } from 'firebase/auth';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.photoURL!} alt={user.email!} />
          <AvatarFallback>
            {user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigate('/admin')}>Admin Dashboard</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
