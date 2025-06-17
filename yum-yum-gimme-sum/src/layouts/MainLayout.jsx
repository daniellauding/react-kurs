import { Outlet, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

function MainLayout() {
  const location = useLocation()
  const cartItems = useSelector(state => state.cart.items)
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#f97316]">
              🍕 Yum Yum Gimme Sum
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-[#f97316] transition-colors ${
                  location.pathname === '/' ? 'text-[#f97316] font-semibold' : ''
                }`}
              >
                Menu
              </Link>
              <Link 
                to="/cart" 
                className={`text-gray-700 hover:text-[#f97316] transition-colors flex items-center space-x-1 ${
                  location.pathname === '/cart' ? 'text-[#f97316] font-semibold' : ''
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-[#f97316] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile cart icon */}
            <Link 
              to="/cart" 
              className="md:hidden flex items-center space-x-1 text-gray-700 hover:text-[#f97316]"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="bg-[#f97316] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Yum Yum Gimme Sum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout 