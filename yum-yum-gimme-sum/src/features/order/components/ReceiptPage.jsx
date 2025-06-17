import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearCurrentOrder } from '../store/orderSlice'
import { CheckCircleIcon, PrinterIcon, ClockIcon } from '@heroicons/react/24/outline'

function ReceiptPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentOrder } = useSelector(state => state.order)

  useEffect(() => {
    // If no current order, redirect to menu
    if (!currentOrder) {
      navigate('/')
    }
  }, [currentOrder, navigate])

  const handleNewOrder = () => {
    dispatch(clearCurrentOrder())
    navigate('/')
  }

  const handlePrint = () => {
    window.print()
  }

  if (!currentOrder) {
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We'll start preparing your food right away!
          </p>
        </div>

        {/* Order Status */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Order Status</h2>
            <span className="bg-[#ffedd5] text-[#9a3412] px-3 py-1 rounded-full text-sm font-medium">
              {currentOrder.status === 'confirmed' ? 'Preparing' : currentOrder.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <ClockIcon className="h-5 w-5" />
            <span>Estimated delivery time: 25-35 minutes</span>
          </div>
        </div>

        {/* Receipt */}
        <div className="card mb-6 print:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Receipt</h2>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 print:hidden"
            >
              <PrinterIcon className="h-5 w-5" />
              <span>Print</span>
            </button>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID: <span className="font-mono">{currentOrder.id}</span></p>
            <p className="text-sm text-gray-600">Date: {formatDate(currentOrder.timestamp)}</p>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Delivery Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{currentOrder.customerInfo.name}</p>
              <p>{currentOrder.customerInfo.email}</p>
              <p>{currentOrder.customerInfo.phone}</p>
              <p>{currentOrder.customerInfo.address}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-2">
              {currentOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{item.image}</span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.price} kr × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{(currentOrder.total - 39 - ((currentOrder.total - 39) * 0.08)).toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>39 kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{((currentOrder.total - 39) * 0.08).toFixed(2)} kr</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#f97316]">{currentOrder.total.toFixed(2)} kr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
          <button
            onClick={handleNewOrder}
            className="btn-primary flex-1"
          >
            Place Another Order
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex-1"
          >
            Back to Menu
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500 print:hidden">
          <p>Questions about your order? Contact us at (555) 123-FOOD</p>
          <p className="mt-1">Thank you for choosing Yum Yum Gimme Sum! 🍕</p>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPage 