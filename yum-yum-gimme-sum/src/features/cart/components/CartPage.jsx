import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateQuantity } from '../store/cartSlice'
import { useCartSummary } from '../hooks/useCart'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, isEmpty } = useCartSummary()

  const handleCheckout = () => {
    if (!isEmpty) {
      navigate('/order')
    }
  }

  const handleRemoveOneItem = (itemId) => {
    const item = items.find(item => item.id === itemId)
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }))
    }
  }

  // Expand items to show each individual item as separate row
  const expandedItems = items.reduce((acc, item) => {
    // Add each quantity as a separate row
    for (let i = 0; i < item.quantity; i++) {
      acc.push({
        ...item,
        quantity: 1,
        displayPrice: item.price
      })
    }
    return acc
  }, [])

  if (isEmpty) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'rgba(238, 238, 238, 1)' }}
      >
        <div className="text-center">
          <div className="mb-4">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mx-auto" style={{ color: 'rgba(53, 49, 49, 0.5)' }}>
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17C21 15.9 20.1 15 19 15C17.9 15 17 15.9 17 17ZM9 19C10.1 19 11 18.1 11 17C11 15.9 10.1 15 9 15C7.9 15 7 15.9 7 17C7 18.1 7.9 19 9 19Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'rgba(53, 49, 49, 1)' }}>
            Din varukorg är tom
          </h1>
          <p className="mb-8" style={{ color: 'rgba(53, 49, 49, 1)' }}>
            Lägg till något gott från vår meny för att komma igång!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}
          >
            Bläddra i meny
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'rgba(238, 238, 238, 1)' }}
    >
      {/* Header with Cart Icon */}
      <div className="flex justify-end items-center p-4">
        <div 
          className="w-12 h-12 bg-white bg-opacity-80 rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all"
          onClick={() => navigate('/')}
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
      </div>

      {/* Cart Items */}
      <div className="px-4 pb-4">
        <div className="space-y-1">
          {expandedItems.map((item, index) => (
            <div key={`${item.id}-${item.name}-${index}`} className="border-b border-gray-300 pb-2">
              <div 
                className="flex items-end w-full cursor-pointer hover:bg-gray-200 hover:bg-opacity-50 p-2 -m-2 rounded transition-colors"
                onClick={() => handleRemoveOneItem(item.id)}
              >
                <h3 className="text-xl font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: 'rgba(53, 49, 49, 1)' }}>
                  {item.name}
                </h3>
                <div className="menu-dots flex-1 mx-4"></div>
                <span className="text-xl font-bold whitespace-nowrap" style={{ color: 'rgba(53, 49, 49, 1)' }}>
                  {item.displayPrice} SEK
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Take My Money Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 space-y-4" style={{ backgroundColor: 'rgba(238, 238, 238, 1)' }}>
        {/* Total Section */}
        <div 
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'rgba(53, 49, 49, 0.24)' }}
        >
          <div className="flex items-end w-full">
            <h3 className="text-xl font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: 'rgba(53, 49, 49, 1)' }}>
              TOTALT
            </h3>
            <div className="menu-dots flex-1 mx-4" style={{ borderBottomColor: 'rgba(53, 49, 49, 1)' }}></div>
            <span className="text-xl font-bold whitespace-nowrap" style={{ color: 'rgba(53, 49, 49, 1)' }}>
              {total} SEK
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-4 rounded-lg font-bold text-white text-lg uppercase tracking-wide"
          style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}
        >
          TAKE MY MONEY!
        </button>
      </div>
    </div>
  )
}

export default CartPage 