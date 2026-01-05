import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Load categories from localStorage
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      // Initialize with sample data
      const sampleCategories = [
        { id: '1', name: 'Laptop', description: 'Portable computers', productCount: 2 },
        { id: '2', name: 'Tablet', description: 'Tablet devices', productCount: 2 },
        { id: '3', name: 'Mobile', description: 'Mobile phones', productCount: 1 },
      ];
      setCategories(sampleCategories);
      localStorage.setItem('categories', JSON.stringify(sampleCategories));
    }
  }, []);

  // Save to localStorage whenever categories change
  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      productCount: 0
    };
    saveCategories([...categories, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updatedData) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, ...updatedData } : category
    );
    saveCategories(updatedCategories);
  };

  const deleteCategory = (id) => {
    const filteredCategories = categories.filter(category => category.id !== id);
    saveCategories(filteredCategories);
  };

  const getCategoryById = (id) => {
    return categories.find(category => category.id === id);
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};
