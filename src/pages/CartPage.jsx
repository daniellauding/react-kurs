import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, clearCart } from '@/features/cart/cartSlice'
import { placeOrder } from '@/features/order/orderSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)
  const { status: orderStatus, error: orderError } = useSelector((state) => state.order)

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handlePlaceOrder = () => {
    dispatch(placeOrder(cartItems))
  }

  useEffect(() => {
    if (orderStatus === 'succeeded') {
      dispatch(clearCart())
      navigate('/order')
    }
  }, [orderStatus, dispatch, navigate])

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-white">
        <h1 className="text-4xl font-bold my-8 uppercase">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="text-green-400 hover:text-green-500 mt-4 inline-block">
          &larr; Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold text-center my-8 uppercase">Your Cart</h1>

      <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-700 py-4"
          >
            <div>
              <h3 className="text-xl font-bold uppercase">{item.title}</h3>
              <p className="text-gray-400">{item.price} SEK</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                -
              </button>
              <span className="px-4 text-xl">{item.quantity}</span>
              <button
                onClick={() => dispatch(addItem(item))}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 text-2xl font-bold">
          <p>TOTAL</p>
          <p>{total} SEK</p>
        </div>

        {orderStatus === 'loading' && <p className="text-center my-4">Placing order...</p>}
        {orderStatus === 'failed' && <p className="text-center my-4 text-red-500">Error: {orderError}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={orderStatus === 'loading'}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded w-full mt-6 text-lg uppercase disabled:bg-gray-500"
        >
          {orderStatus === 'loading' ? 'Ordering...' : 'Take my money!'}
        </button>
      </div>
    </div>
  )
}

export default CartPage 