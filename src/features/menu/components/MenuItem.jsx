import { useDispatch } from 'react-redux'
import { addItem } from '@/features/cart/cartSlice'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem(item))
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-white mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold uppercase">{item.title}</h3>
        <p className="text-xl font-bold">{item.price} SEK</p>
      </div>
      <p className="text-gray-300 mb-4">{item.desc}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default MenuItem 