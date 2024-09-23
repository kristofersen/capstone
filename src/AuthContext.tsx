import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: string;
  // Add other properties as needed
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data based on token
    if (token) {
      // Replace with your actual user fetching logic
      const fetchUser = async () => {
        const userData = await fetchUserData(token);
        setUser(userData);
      };
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token]);

  const value = {
    token,
    setToken: (token: string | null) => {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      setToken(token);
    },
    isAuthenticated: !!token,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Mock function to fetch user data
const fetchUserData = async (token: string): Promise<User> => {
  // Replace with your actual API call
  console.log(`Fetching user data with token: ${token}`);
  return {
    id: '1',
    name: 'Super Admin',
    role: 'superadmin',
  };
};