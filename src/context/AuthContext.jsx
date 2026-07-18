import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const STORAGE_KEY = 'fitforge-users';
const CURRENT_USER_KEY = 'fitforge-current-user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  const getUsers = () => {
    try {
      const users = localStorage.getItem(STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };

  const register = (userData) => {
    const users = getUsers();
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      toast.error('An account with this email already exists.');
      return false;
    }
    const newUser = {
      id: Date.now(),
      ...userData,
      joinDate: new Date().toISOString().split('T')[0],
      membership: 'Basic',
      bmiHistory: [],
      workoutProgress: [],
      attendance: [],
      notifications: [
        {
          id: 1,
          type: 'success',
          message: `Welcome to FitForge, ${userData.name}! Your journey starts today.`,
          date: new Date().toISOString().split('T')[0],
          read: false,
        },
      ],
    };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    toast.success(`Welcome to FitForge, ${userData.name}! 🎉`);
    return true;
  };

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      toast.error('Invalid email or password.');
      return false;
    }
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    toast.success(`Welcome back, ${user.name}! 💪`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.info('You have been logged out.');
  };

  const updateUser = (updates) => {
    const updated = { ...currentUser, ...updates };
    const users = getUsers();
    const newUsers = users.map(u => u.id === updated.id ? updated : u);
    saveUsers(newUsers);
    setCurrentUser(updated);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
  };

  const addBMIRecord = (record) => {
    const bmiHistory = [...(currentUser.bmiHistory || []), record];
    updateUser({ bmiHistory });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      register,
      login,
      logout,
      updateUser,
      addBMIRecord,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
