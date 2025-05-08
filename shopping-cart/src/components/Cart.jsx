import React from 'react'

const Cart = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-md text-[#c95b86]">Cart</p>
      <p className="text-md bg-white rounded-full flex items-center justify-center w-6 h-6 text-gray-900">
        0
      </p>
    </div>
  );
}

export default Cart;