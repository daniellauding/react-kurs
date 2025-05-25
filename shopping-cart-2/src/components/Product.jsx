import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ id, title, author, description, addToCart }) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex-1">
        <Link 
          to={`/product/${id}`}
          className="block hover:text-blue-600 transition-colors"
        >
          <p className="text-lg font-bold text-[#032450] mb-2">{title}</p>
        </Link>
        <p className="text-md text-[#032450] mb-3">{author}</p>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <Link 
          to={`/product/${id}`}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium text-center"
        >
          Visa detaljer →
        </Link>
        <button
          onClick={addToCart}
          className="bg-[#37aeab] hover:bg-[#2d8b89] text-white px-4 py-2 rounded-md transition-colors"
        >
          Lägg till i kundvagn
        </button>
      </div>
    </div>
  );
};

export default Product;