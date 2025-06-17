import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetOrderStatus } from '@/features/order/orderSlice'

const ReceiptPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const receiptItems = useSelector((state) => state.cart.lastReceiptItems)
  const { lastOrder } = useSelector((state) => state.order)

  if (!lastOrder || receiptItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-white">
        <h1 className="text-4xl font-bold my-8 uppercase">No Receipt Found</h1>
        <p>You must place an order to see a receipt.</p>
        <Link to="/" className="text-green-400 hover:text-green-500 mt-4 inline-block">
          &larr; Back to Menu
        </Link>
      </div>
    )
  }

  const total = receiptItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handleNewOrder = () => {
    dispatch(resetOrderStatus())
    navigate('/')
  }

  return (
    <div className="container mx-auto p-4 text-white flex flex-col items-center">
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">KVITTO</h2>
          <p className="text-gray-400">#{lastOrder.orderId}</p>
        </div>

        {receiptItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start py-2">
            <div>
              <h3 className="text-xl font-bold uppercase">{item.title}</h3>
              <p className="text-gray-400">{item.quantity} stycken</p>
            </div>
            <p className="text-xl font-bold">{item.price * item.quantity} SEK</p>
          </div>
        ))}
        
        <div className="border-t border-gray-600 my-4"></div>

        <div className="flex justify-between items-center mt-6 text-2xl font-bold">
          <p>TOTALT</p>
          <p>{total} SEK</p>
        </div>
        <p className="text-right text-gray-400">inkl 20% moms</p>
        
        <button
          onClick={handleNewOrder}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded w-full mt-8 text-lg uppercase"
        >
          Gör en ny beställning
        </button>
      </div>
    </div>
  )
}

export default ReceiptPage 