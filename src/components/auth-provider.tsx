'use client';

import { createContext, useEffect, useState, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { LoginForm, SignUpForm, UserRole } from '@/lib/types';
import { getUserRole, createUserInFirestore } from '@/app/actions';

type AuthContextType = {
  user: User | null;
  userRole: UserRole | null;
  login: (data: LoginForm) => Promise<UserRole>;
  signup: (data: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleUserAuth = useCallback(async (user: User | null) => {
    if (user) {
      const role = await getUserRole(user.uid);
      setUser(user);
      setUserRole(role);
    } else {
      setUser(null);
      setUserRole(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUserAuth);
    return () => unsubscribe();
  }, [handleUserAuth]);

  const login = async (data: LoginForm): Promise<UserRole> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const role = await getUserRole(userCredential.user.uid);
      setUserRole(role);
      return role;
    } catch (error: any) {
      console.error('Error signing in', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'Could not sign you in. Please check your credentials and try again.',
      });
      throw error;
    }
  };

  const signup = async (data: SignUpForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await createUserInFirestore(userCredential.user.uid, data.email);
      setUserRole('user'); // Default role
    } catch (error: any) {
      console.error('Error signing up', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message || 'Could not create your account. Please try again.',
      });
      throw error;
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out', error);
       toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'Could not sign you out. Please try again.',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
