import { createContext, useState, useEffect, useCallback } from 'react';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- AUTO-LOGOUT CONFIGURATION ---
  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 Minutes
  
  const logout = useCallback(() => {
    console.log("Session expired. Logging out.");
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    setUser(null);
    window.location.href = '/login'; // Force redirect to login
  }, []);

  // Inactivity Timer Logic
  useEffect(() => {
    let timer;
    
    const resetTimer = () => {
      if (user) {
        clearTimeout(timer);
        timer = setTimeout(logout, INACTIVITY_LIMIT);
      }
    };

    // Events that count as "activity"
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    
    // Attach listeners
    if (user) {
        events.forEach(event => window.addEventListener(event, resetTimer));
        resetTimer(); // Start initial timer
    }

    // Cleanup
    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, logout]);

  // Initial Load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user_email');
    if (token && savedUser) {
      setUser({ email: savedUser });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        
        const res = await api.post('/token', formData);
        
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user_email', email);
        setUser({ email });
        return true;
    } catch (err) {
        console.error("Login Error:", err);
        throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};