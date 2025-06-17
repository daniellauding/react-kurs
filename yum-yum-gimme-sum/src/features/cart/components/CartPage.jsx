import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice'
import { useCartSummary } from '../hooks/useCart'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, isEmpty } = useCartSummary()

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    if (!isEmpty) {
      navigate('/order')
    }
  }

  if (isEmpty) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some delicious items from our menu to get started!
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 flex items-center space-x-1"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="card flex items-center space-x-4">
                <div className="text-4xl">{item.image}</div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                  <p className="text-[#f97316] font-bold">
                    {item.price} kr
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    {(item.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{total.toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">39 kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">{(total * 0.08).toFixed(2)} kr</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#f97316]">
                  {(total + 39 + (total * 0.08)).toFixed(2)} kr
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full mt-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage 