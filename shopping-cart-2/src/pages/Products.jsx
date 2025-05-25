import Product from '../components/Product'
import { getAllProducts } from '../data/products'

function Products({ addToCart }) {
  const products = getAllProducts()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Alla produkter</h1>
      
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

export default Products 