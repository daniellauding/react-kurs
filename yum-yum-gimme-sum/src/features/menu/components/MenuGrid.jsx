import { PlusIcon } from '@heroicons/react/24/outline'

function MenuGrid({ items, onAddToCart, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Laddar meny...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Inga produkter hittades i denna kategori.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <div key={item.id} className="card hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{item.image || '🍽️'}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#f97316]">
                {item.price} kr
              </span>
              <button
                onClick={() => onAddToCart(item)}
                className="btn-primary flex items-center space-x-1"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Lägg till</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuGrid 