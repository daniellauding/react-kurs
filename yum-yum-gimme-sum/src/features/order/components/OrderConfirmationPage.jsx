import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCustomerInfo, submitOrder } from '../store/orderSlice'
import { clearCart } from '../../cart/store/cartSlice'

function OrderConfirmationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector(state => state.cart)
  const { customerInfo, loading, error } = useSelector(state => state.order)

  const [formData, setFormData] = useState({
    name: customerInfo.name || '',
    email: customerInfo.email || '',
    phone: customerInfo.phone || '',
    address: customerInfo.address || ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (items.length === 0) {
      navigate('/cart')
      return
    }

    try {
      dispatch(setCustomerInfo(formData))
      
      await dispatch(submitOrder({
        items,
        total: total + 39 + (total * 0.08)
      })).unwrap()
      
      dispatch(clearCart())
      navigate('/receipt')
    } catch (error) {
      console.error('Order submission failed:', error)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="text-8xl mb-4">📋</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No items to order</h1>
          <p className="text-gray-600 mb-8">
            Please add items to your cart before proceeding to checkout.
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Confirmation</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'bg-gray-100' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'bg-gray-100' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'bg-gray-100' : ''}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={loading}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'bg-gray-100' : ''}`}
                placeholder="Enter your full delivery address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Placing Order...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="card">
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{item.image || '🍽️'}</span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
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
          </div>

          <button
            onClick={() => navigate('/cart')}
            disabled={loading}
            className="btn-secondary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage 