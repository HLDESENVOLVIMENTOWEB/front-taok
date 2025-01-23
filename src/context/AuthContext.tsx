import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api.ts';

interface User {
  id: number;
  role: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Verifica se há um token no localStorage ao carregar o aplicativo
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      const decodedToken: any = JSON.parse(atob(savedToken.split('.')[1]));
      setUser({ id: decodedToken.id, role: decodedToken.role });
      setToken(savedToken);
    }
  }, []);

  // Função para login
  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, senha: password });
      const { token } = response.data;
      
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
      }

      if (!token) {
        throw new Error('Token not available');
      }
  
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
  
      setUser({ id: decodedToken.id, role: decodedToken.role });
      setToken(token);
  
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Failed to decode token:', error); // Log the error for debugging
      throw new Error('Erro ao fazer login');
    }
  };

  // Função para logout
  const signOut = () => {
    setUser(null);
    setToken(null);

    // Remover token do localStorage e dos cabeçalhos do Axios
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};
