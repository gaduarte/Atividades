import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

type User = {
  username: string;
};

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null | undefined;
  signin: (credentials: SignInCredentials) => Promise<void>;
  signout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const defaultValue: AuthContextType = {
  user: null,
  signin: async () => {},
  signout: () => {},
  updateUser: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthState | null>(() => {
    const token = localStorage.getItem("@TaskApp:token");
    const user = localStorage.getItem("@TaskApp:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return null;
  });

  const signin = useCallback(async ({ username, password }: SignInCredentials) => {
    try {
      const response = await api.post('/auth', { username, password });

      const { token, user } = response.data;

      localStorage.setItem('@TaskApp:token', token);
      localStorage.setItem('@TaskApp:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser({ token, user });
    } catch (error) {
      console.error('Signin failed:', error);
    }
  }, [setUser]);

  const signout = useCallback(() => {
    localStorage.removeItem('@TaskApp:token');
    localStorage.removeItem('@TaskApp:user');
    api.defaults.headers.authorization = '';
    setUser(null);
  }, [setUser]);

  const updateUser = useCallback((newUser: User) => {
    localStorage.setItem('@TaskApp:user', JSON.stringify(newUser));
    setUser((prevUser) => prevUser && { ...prevUser, user: newUser });
  }, [setUser]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user: user?.user, signin, signout, updateUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
