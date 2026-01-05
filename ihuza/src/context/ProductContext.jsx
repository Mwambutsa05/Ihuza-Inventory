import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Initialize with sample data
      const sampleProducts = [
        { id: '1', name: 'Macbook Pro 16"', category: 'Laptop', sku: 'MB-001', price: 2499, stock: 15, status: 'In Stock', addedDate: 'Jan 15, 2024' },
        { id: '2', name: 'Dell XPS 13', category: 'Laptop', sku: 'DL-002', price: 1299, stock: 8, status: 'In Stock', addedDate: 'Jan 10, 2024' },
        { id: '3', name: 'iPad Air', category: 'Tablet', sku: 'IP-003', price: 599, stock: 25, status: 'In Stock', addedDate: 'Jan 5, 2024' },
        { id: '4', name: 'Surface Pro 9', category: 'Tablet', sku: 'SF-004', price: 999, stock: 0, status: 'Out of Stock', addedDate: 'Dec 28, 2023' },
        { id: '5', name: 'iPhone 15 Pro', category: 'Mobile', sku: 'IP-005', price: 1099, stock: 45, status: 'Low Stock', addedDate: 'Dec 20, 2023' }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      addedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    saveProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updatedData } : product
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const filteredProducts = products.filter(product => product.id !== id);
    saveProducts(filteredProducts);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const searchProducts = (query) => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.sku.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
