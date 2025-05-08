import React from 'react'
import Cart from './Cart'

import { Home02 } from '@untitled-ui/icons-react';

const Header = () => {
  return (
    <div className="border-t-2 border-t-white fixed top-0 left-0 right-0 z-10">
      <div class="container py-12 flex flex-row justify-between items-center mx-auto">
        <button
          onClick={() => window.location.reload()}
          style={{ border: 'none', background: 'none', padding: 0 }}
        >
          <Home02 size={24} />
        </button>

        <Cart />
      </div>
    </div>
  );
}

export default Header;