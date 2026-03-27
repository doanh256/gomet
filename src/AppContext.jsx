import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useToast } from './components/ToastNotification';
import { api } from './api/client';
import { connectSocket, disconnectSocket, getSocket } from './api/socket';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { addToast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);

  // Restore session from token on mount
  useEffect(() => {
    const token = localStorage.getItem('gomet_token');
    // Dev preview bypass: token starting with 'mock-' skips API call
    if (token && token.startsWith('mock-')) {
      const stored = localStorage.getItem('gomet_user');
      const user = stored ? JSON.parse(stored) : { id:'1', name:'Hằng Thị', email:'hang@gomet.app', role:'user', avatar:null };
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoading(false);
      return;
    }
    if (token) {
      api.get('/auth/me')
        .then(data => {
          if (data?.user) {
            setCurrentUser(data.user);
            setIsLoggedIn(true);
            connectSocket();
          }
        })
        .catch(() => {
          localStorage.removeItem('gomet_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('gomet_token', data.token);
    setCurrentUser(data.user);
    setIsLoggedIn(true);
    connectSocket();
    return data.user;
  }, []);

  // Register
  const register = useCallback(async (name, email, password) => {
    const data = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('gomet_token', data.token);
    setCurrentUser(data.user);
    setIsLoggedIn(true);
    connectSocket();
    return data.user;
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('gomet_token');
    disconnectSocket();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setProfiles([]);
    setMatches([]);
    setConversations([]);
  }, []);

  // Admin mode (for login page)
  const setAdminMode = useCallback(async (email, password) => {
    const user = await login(email, password);
    return user;
  }, [login]);

  // Fetch profiles for swiping
  const fetchProfiles = useCallback(async () => {
    try {
      const data = await api.get('/users/profiles');
      if (data?.profiles) setProfiles(data.profiles);
    } catch (err) {
      console.error('Fetch profiles error:', err);
    }
  }, []);

  // Fetch matches
  const fetchMatches = useCallback(async () => {
    try {
      const data = await api.get('/users/matches');
      if (data?.matches) setMatches(data.matches);
    } catch (err) {
      console.error('Fetch matches error:', err);
    }
  }, []);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      const data = await api.get('/conversations');
      if (data?.conversations) setConversations(data.conversations);
    } catch (err) {
      console.error('Fetch conversations error:', err);
    }
  }, []);

  // Swipe action
  const swipe = useCallback(async (targetId, action) => {
    try {
      const data = await api.post('/swipes', { targetId, action });
      if (data?.matched) {
        addToast(`🎉 Match! Bạn và ${data.matchUser?.name || 'ai đó'} đã kết nối!`, 'success');
        fetchMatches();
        fetchConversations();
      }
      setProfiles(prev => prev.filter(p => p.id !== targetId));
      return data;
    } catch (err) {
      console.error('Swipe error:', err);
      return { matched: false };
    }
  }, [addToast, fetchMatches, fetchConversations]);

  // Send message via socket
  const sendMessage = useCallback((conversationId, text) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('send_message', { conversationId, text });
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data) => {
    const result = await api.put('/users/me', data);
    if (result?.user) setCurrentUser(result.user);
    return result;
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser,
      isLoggedIn,
      loading,
      login,
      register,
      logout,
      setAdminMode,
      profiles,
      setProfiles,
      fetchProfiles,
      matches,
      fetchMatches,
      conversations,
      fetchConversations,
      swipe,
      sendMessage,
      updateProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
