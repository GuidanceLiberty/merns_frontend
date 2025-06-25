import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const BASE_URL = process.env.REACT_APP_MAIN_URL || 'http://localhost:4000/api';

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
