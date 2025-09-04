'use client';

import { createContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { LoginForm, SignUpForm } from '@/lib/types';

type AuthContextType = {
  user: User | null;
  login: (data: LoginForm) => Promise<void>;
  signup: (data: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
      await createUserWithEmailAndPassword(auth, data.email, data.password);
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
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
