import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../cart/store/cartSlice'

function ReceiptPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector(state => state.cart)

  const handleNewOrder = () => {
    dispatch(clearCart())
    navigate('/')
  }

  // Group items by name and sum quantities
  const groupedItems = items.reduce((acc, item) => {
    const existingItem = acc.find(i => i.name === item.name)
    if (existingItem) {
      existingItem.quantity += 1
      existingItem.totalPrice = existingItem.quantity * existingItem.price
    } else {
      acc.push({
        ...item,
        quantity: 1,
        totalPrice: item.price
      })
    }
    return acc
  }, [])

  // Calculate total with 20% moms
  const totalWithMoms = total * 1.2

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}
    >
      {/* Logo */}
      <div className="mb-8">
        <img 
          src="/brand-logo.png" 
          alt="YYG Brand Logo" 
          className="w-16 h-16"
        />
      </div>

      {/* Receipt Container */}
      <div 
        className="w-full max-w-md p-8 rounded-lg"
        style={{ backgroundColor: 'rgba(238, 238, 238, 1)' }}
      >
        {/* Receipt Header */}
        <div className="text-center mb-8">
          <img 
            src="/logo.svg" 
            alt="YYG Logo" 
            className="w-12 h-12 mx-auto mb-4"
          />
          <h1 
            className="text-2xl font-bold mb-2 uppercase tracking-wide"
            style={{ color: 'rgba(53, 49, 49, 1)' }}
          >
            KVITTO
          </h1>
          <p 
            className="text-sm font-mono"
            style={{ color: 'rgba(53, 49, 49, 0.7)' }}
          >
            #4KJWSDF234K
          </p>
        </div>

        {/* Receipt Items */}
        <div className="space-y-4 mb-6">
          {groupedItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-end w-full">
                <h3 
                  className="text-lg font-bold uppercase tracking-wide whitespace-nowrap"
                  style={{ color: 'rgba(53, 49, 49, 1)' }}
                >
                  {item.name}
                </h3>
                <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-400 mb-1"></div>
                <span 
                  className="text-lg font-bold whitespace-nowrap"
                  style={{ color: 'rgba(53, 49, 49, 1)' }}
                >
                  {item.totalPrice} SEK
                </span>
              </div>
              <p 
                className="text-sm mt-1"
                style={{ color: 'rgba(53, 49, 49, 0.7)' }}
              >
                {item.quantity} stycken
              </p>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div 
          className="p-4 rounded"
          style={{ backgroundColor: 'rgba(53, 49, 49, 0.24)' }}
        >
          <div className="flex items-end w-full">
            <h3 
              className="text-xl font-bold uppercase tracking-wide whitespace-nowrap"
              style={{ color: 'rgba(53, 49, 49, 1)' }}
            >
              TOTALT
            </h3>
            <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-600 mb-1"></div>
            <span 
              className="text-xl font-bold whitespace-nowrap"
              style={{ color: 'rgba(53, 49, 49, 1)' }}
            >
              {Math.round(totalWithMoms)} SEK
            </span>
          </div>
          <p 
            className="text-sm mt-1"
            style={{ color: 'rgba(53, 49, 49, 0.7)' }}
          >
            inkl 20% moms
          </p>
        </div>
      </div>

      {/* New Order Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4" style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}>
        <button
          onClick={handleNewOrder}
          className="w-full py-4 rounded-lg font-bold text-white text-lg uppercase tracking-wide"
          style={{ backgroundColor: 'rgba(53, 49, 49, 1)', border: '2px solid white' }}
        >
          GÖR EN NY BESTÄLLNING
        </button>
      </div>
    </div>
  )
}

export default ReceiptPage 