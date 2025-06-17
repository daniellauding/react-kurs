import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../features/cart/store/cartSlice'
import { useMenuItems } from '../hooks/useMenu'

function MenuPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: allItems, loading, error } = useMenuItems()
  const cartItems = useSelector(state => state.cart.items)

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Filtrera bort dips från main menu items - bara visa maträtter för 9 SEK
  const menuItems = allItems.filter(item => item.price === 9)

  // Dips är separata och har fast pris 19 SEK
  const dips = [
    { id: 'sweet-chili', name: 'sweet chili', price: 19, type: 'dip' },
    { id: 'sweet-sour', name: 'sweet & sour', price: 19, type: 'dip' },
    { id: 'guacamole', name: 'guacamole', price: 19, type: 'dip' },
    { id: 'wonton-std', name: 'wonton std', price: 19, type: 'dip' },
    { id: 'hot-mango', name: 'hot mango', price: 19, type: 'dip' },
    { id: 'chili-mayo', name: 'chili mayo', price: 19, type: 'dip' }
  ]

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  const isItemInCart = (itemId) => {
    return cartItems.some(cartItem => cartItem.id === itemId)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#605858] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">Kunde inte ladda menyn</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium"
          >
            Försök igen
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#605858] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Laddar meny...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/bg@2x.png)',
        backgroundColor: '#9fd6c0',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="YYG Logo"
          className="w-16 h-16 cursor-pointer"
          onClick={() => window.location.reload()}
        />

        {/* Cart */}
        <div className="relative">
          <div 
            className="w-12 h-12 bg-white bg-opacity-80 rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all"
            onClick={() => navigate('/cart')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-700">
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17C21 15.9 20.1 15 19 15C17.9 15 17 15.9 17 17ZM9 19C10.1 19 11 18.1 11 17C11 15.9 10.1 15 9 15C7.9 15 7 15.9 7 17C7 18.1 7.9 19 9 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {cartItemCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartItemCount}
            </div>
          )}
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-[#605858] text-white p-0 mx-0 md:mx-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-2 tracking-wider uppercase text-white p-6">Meny</h1>

        {/* Menu Items - bara 9 SEK maträtter */}
        <div className="space-y-0 mb-0">
          {menuItems.map((item, index) => {
            const inCart = isItemInCart(item.id || `item-${index}`);
            return (
              <div
                key={item.id || index}
                className="border-b border-t border-[rgba(241,240,236,0.08)] pb-0"
              >
                <div
                  className={`p-6 flex justify-between items-start p-6 rounded-lg transition-all cursor-pointer ${
                    inCart ? 'bg-[rgba(241,240,236,0.12)]' : 'hover:bg-[rgba(241,240,236,0.08)]'
                  }`}
                  onClick={() => handleAddToCart(item)}
                >
                  <div className="w-full">
                    {/* Namn, dots och pris på samma rad */}
                    <div className="flex items-end w-full mb-1">
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-white whitespace-nowrap">
                        {item.name}
                      </h3>
                      <div className="menu-dots flex-1 mx-4"></div>
                      <span className="text-2xl font-bold text-white whitespace-nowrap">
                        {item.price} SEK
                      </span>
                    </div>
                    {/* Ingredients på egen rad under */}
                    <p className="text-gray-300 text-sm">
                      {item.ingredients?.join(', ') || item.description || 'Läcker rätt'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dips Section */}
        <div>
          <div className="flex justify-between items-end mb-0 p-6 pb-0">
            <h3 className="text-2xl font-bold uppercase tracking-wide text-white whitespace-nowrap">
              DIPSÅS
            </h3>
            <div className="dips-dots flex-1 mx-4 mt-3"></div>
            <span className="text-xl font-bold text-white">19 SEK</span>
          </div>
          <div className="flex flex-wrap gap-3 p-6">
            {dips.map(dip => {
              const dipInCart = isItemInCart(dip.id);
              return (
                <button
                  key={dip.id}
                  onClick={() => handleAddToCart(dip)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm max-h-8 flex items-center justify-center whitespace-nowrap ${
                    dipInCart
                      ? 'bg-[rgba(53,49,49,1)] text-white'
                      : 'bg-[rgba(241,240,236,0.24)] text-white hover:bg-[rgba(241,240,236,0.3)]'
                  }`}
                  style={{ fontSize: '14px' }}
                >
                  {dip.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage 