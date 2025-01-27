import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api.ts';

interface User {
  id: number;
  role: string;
}

interface LoginResponse {
  token: string;
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
      const decodedToken = decodeToken(savedToken);
      if (decodedToken) {
        setUser({ id: decodedToken.id, role: decodedToken.role });
        setToken(savedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      } else {
        signOut(); 
      }
    }
  }, []);
  

  // Função para login
  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/usuarios/login', { email, senha: password });
      const { token } = response.data;

      console.log(token)
  
      const decodedToken = decodeToken(token);
      if (!decodedToken) {
        throw new Error('Failed to decode token');
      }
  
      setUser({ id: decodedToken.id, role: decodedToken.role });
      setToken(token);
  
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw new Error('Erro ao fazer login');
    }
  };

  const decodeToken = (token: string): any | null => {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
      }
      return JSON.parse(atob(tokenParts[1]));
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
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
