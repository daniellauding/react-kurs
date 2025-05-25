import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Produkten hittades inte</h1>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tillbaka till produkter
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
      >
        ← Tillbaka
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{product.author}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Beskrivning</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.fullDescription}
              </p>
              
              <div className="space-y-2 mb-6">
                <p><strong>Pris:</strong> {product.price}</p>
                <p><strong>Sidor:</strong> {product.pages}</p>
                <p><strong>Publicerad:</strong> {product.published}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Köp denna bok</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Lägg till i kundvagn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 