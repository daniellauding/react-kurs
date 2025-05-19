import React from 'react'

const Product = ({ title, author, description, addToCart }) => {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <p className="text-md font-bold text-[#032450]">{title}</p>
      <p className="text-md text-[#032450]">{author}</p>
      <p className="text-md text-[#032450]">{description}</p>
      <button
        onClick={addToCart}
        className="bg-[#37aeab] text-white px-4 py-2 rounded-md max-w-fit w-fit mx-auto"
      >
        Add to cart
      </button>
    </div>
  );
};

export default Product;