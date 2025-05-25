import React, { useState } from 'react'

const Cart = ({ cartItems, removeFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative"> {/* Behållare för positionering av dropdown */}
      <div 
        className="flex flex-row items-center gap-2 cursor-pointer" 
        onClick={toggleCart}
      >
        <p className="text-md text-[#c95b86]">Cart</p>
        <p className="text-md bg-white rounded-full flex items-center justify-center w-6 h-6 text-gray-900">
          {cartItems ? cartItems.length : 0}
        </p>
      </div>

      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4">
          {cartItems && cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <span className="text-sm text-gray-700">{item.title}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold"
                  >
                    Ta bort
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Din kundvagn är tom.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;