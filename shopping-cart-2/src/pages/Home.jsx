import Product from '../components/Product'
import { getAllProducts } from '../data/products'

function Home({ cartItems, addToCart }) {
  const products = getAllProducts()

  return (
    <div>
      {/* Välkomstbanner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Välkommen till vår bokhandel!</h1>
        <p className="text-xl">Upptäck fantastiska böcker från Sir Arthur Conan Doyle</p>
      </div>

      {/* Produktlista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            author={product.author}
            description={product.description}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home 