import React, { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext(null);

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Effect to update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Value to be provided to consumers
  const contextValue = {
    user,
    setUser,
    login,
    logout
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// Export a default object to ensure module compatibility
export default {
  UserContext,
  UserProvider,
  useUser
};