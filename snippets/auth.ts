import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  user?: any; // Adjust the type based on your user data structure
}

const useAuth = (): [AuthState, (token: string) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedUser = jwtDecode(token);
      setAuthState({
        isAuthenticated: true,
        token,
        user: decodedUser,
      });
    }
  }, []);

  const login = (token: string): void => {
    localStorage.setItem('jwtToken', token);
    const decodedUser = jwtDecode(token);
    setAuthState({
      isAuthenticated: true,
      token,
      user: decodedUser,
    });
  };

  const logout = (): void => {
    localStorage.removeItem('jwtToken');
    setAuthState({
      isAuthenticated: false,
    });
  };

  return [authState, login, logout];
};

export default useAuth;