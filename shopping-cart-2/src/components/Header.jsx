import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cart from './Cart'
import { Home02 } from '@untitled-ui/icons-react';

const Header = ({ cartItems, removeFromCart }) => {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <div className="border-t-2 border-t-white fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="container py-4 flex flex-row justify-between items-center mx-auto px-4">
        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isActive('/') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <Home02 size={20} />
            <span>Hem</span>
          </Link>
          
          <Link
            to="/products"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/products') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Produkter
          </Link>
          
          <Link
            to="/about"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/about') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Om oss
          </Link>
        </nav>

        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default Header;