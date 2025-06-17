import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline' // Using heroicons for the icon

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="container mx-auto p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-4xl font-bold border-2 border-white p-2">
        YYGS
      </Link>
      <Link to="/cart" className="relative">
        <ShoppingBagIcon className="h-10 w-10" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  )
}

export default Header 