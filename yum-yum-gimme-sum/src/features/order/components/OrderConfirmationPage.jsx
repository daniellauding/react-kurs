import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../cart/store/cartSlice'

function OrderConfirmationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNewOrder = () => {
    dispatch(clearCart())
    navigate('/')
  }

  const handleShowReceipt = () => {
    navigate('/receipt')
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}
    >
      {/* Logo */}
      <div className="mb-8">
        <img 
          src="/logo.svg" 
          alt="YYG Logo" 
          className="w-16 h-16"
        />
      </div>

      {/* Food Container Image */}
      <div className="mb-8">
        <img 
          src="/maten.png" 
          alt="Food Container" 
          className="max-w-sm w-full"
        />
      </div>

      {/* Order Status Text */}
      <div className="text-center mb-12">
        <h1 
          className="text-white text-3xl font-bold mb-4 uppercase tracking-wide"
          style={{ textTransform: 'uppercase' }}
        >
          dina wontons tillagas!
        </h1>
        
        <p className="text-white text-xl mb-4">
          ETA 5 min
        </p>
        
        <p className="text-white text-lg font-mono">
          #4KJWSDF234K
        </p>
      </div>

      {/* Action Buttons - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 space-y-4" style={{ backgroundColor: 'rgba(53, 49, 49, 1)' }}>
        <button
          onClick={handleNewOrder}
          className="w-full py-4 rounded-lg font-bold text-white text-lg uppercase tracking-wide"
          style={{ backgroundColor: 'rgba(53, 49, 49, 1)', border: '2px solid white' }}
        >
          GÖR EN NY BESTÄLLNING
        </button>
        
        <button
          onClick={handleShowReceipt}
          className="w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wide"
          style={{ 
            backgroundColor: 'transparent', 
            color: 'rgba(53, 49, 49, 1)',
            backgroundColor: 'white',
            border: '2px solid white'
          }}
        >
          SE KVITTO
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmationPage 