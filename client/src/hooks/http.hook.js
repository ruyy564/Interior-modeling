import { useState, useCallback } from 'react';
import { useAuth } from './auth.hook';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const clearError = () => {
    setError(null);
  };
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      //const decodeData = verify(user?.token, 'config.secret');
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        headers['Authorization'] = `Bearer ${user?.token}`;

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        console.log(e.message);
        if (e.message === 'TokenExpiredError') {
          localStorage.removeItem('userData');
          logout();
        }
        throw e;
      }
    }
  );

  return { loading, request, error, clearError };
};