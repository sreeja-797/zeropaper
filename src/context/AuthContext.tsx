import { AuthService, UserData } from '@/services/authService';
import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'student' | 'recruiter';
  name?: string;
  companyName?: string;
  recruiterName?: string;
  designation?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (userData: Omit<UserData, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string, role: 'student' | 'recruiter') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.name,
          companyName: userData.companyName,
          recruiterName: userData.recruiterName,
          designation: userData.designation,
        });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<UserData, 'id' | 'createdAt'>) => {
    const result = await AuthService.signup(userData);
    if (result.success && result.user) {
      setUser({
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        name: result.user.name,
        companyName: result.user.companyName,
        recruiterName: result.user.recruiterName,
        designation: result.user.designation,
      });

      // Navigate back to login screen after signup
      if (result.user.role === 'student') {
        router.push('/(auth)/student-login' as any);
      } else {
        router.push('/(auth)/recruiter-login' as any);
      }
    }
    return { success: result.success, error: result.error };
  };

  const login = async (email: string, password: string, role: 'student' | 'recruiter') => {
    const result = await AuthService.login(email, password, role);
    if (result.success && result.user) {
      setUser({
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        name: result.user.name,
        companyName: result.user.companyName,
        recruiterName: result.user.recruiterName,
        designation: result.user.designation,
      });

      // Navigate based on role
      if (result.user.role === 'student') {
        router.push('/(student)/basic-details' as any);
      } else {
        router.push('/(recruiter)/dashboard' as any);
      }
    }
    return { success: result.success, error: result.error };
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      router.push('/(auth)/role-selection' as any);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    const result = await AuthService.updateUser(user.id, updates);
    if (result.success && result.user) {
      setUser({
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        name: result.user.name,
        companyName: result.user.companyName,
        recruiterName: result.user.recruiterName,
        designation: result.user.designation,
      });
    }
    return { success: result.success, error: result.error };
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        updateUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
