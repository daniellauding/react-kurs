import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetOrderStatus } from '@/features/order/orderSlice'
import { useEffect } from 'react'

const OrderConfirmationPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastOrder } = useSelector((state) => state.order)
  const cartForReceipt = useSelector((state) => state.cart.lastReceiptItems) // We need to add this to the cart slice

  useEffect(() => {
    // If a user lands here without an order, redirect them.
    if (!lastOrder) {
      navigate('/')
    }
  }, [lastOrder, navigate])
  
  const handleNewOrder = () => {
    dispatch(resetOrderStatus())
    // We should also clear the last order details if we navigate away
    navigate('/')
  }
  
  if (!lastOrder) {
    return null // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto p-4 text-center text-white flex flex-col items-center">
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold uppercase mb-4">Dina Wontons Tillagas!</h1>
        <p className="text-5xl font-bold mb-4">ETA {lastOrder.eta} min</p>
        <p className="text-gray-400 mb-8">#{lastOrder.orderId}</p>

        <button 
          onClick={handleNewOrder}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded w-full mb-4 text-lg uppercase"
        >
          Gör en ny beställning
        </button>
        <Link 
          to="/receipt" 
          className="border border-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded w-full block text-lg uppercase"
        >
          Se Kvitto
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmationPage 