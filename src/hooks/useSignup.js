import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const BASE_URL = process.env.REACT_APP_MAIN_URL || 'http://localhost:4000';

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || 'Signup failed');
      } else {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError('Network error. Please try again.');
    }
  };

  return { signup, isLoading, error };
};
