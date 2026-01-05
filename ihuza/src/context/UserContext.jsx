import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with default admin user
      const defaultUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@huza.com',
          password: 'admin123',
          role: 'admin',
          status: 'Active',
          lastLogin: '2 hours ago',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'user123',
          role: 'user',
          status: 'Active',
          lastLogin: '5 hours ago',
          createdAt: new Date().toISOString()
        }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Save to localStorage whenever users change
  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      status: 'Active',
      lastLogin: 'Never',
      createdAt: new Date().toISOString()
    };
    saveUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (id, updatedData) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    saveUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    saveUsers(filteredUsers);
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
