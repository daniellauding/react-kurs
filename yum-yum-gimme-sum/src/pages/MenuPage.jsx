import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { PlusIcon } from '@heroicons/react/24/outline'

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    price: 12.99,
    category: "Pizza",
    image: "🍕"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella, and tomato sauce",
    price: 14.99,
    category: "Pizza",
    image: "🍕"
  },
  {
    id: 3,
    name: "Classic Burger",
    description: "Beef patty, lettuce, tomato, onion, and special sauce",
    price: 11.99,
    category: "Burgers",
    image: "🍔"
  },
  {
    id: 4,
    name: "Chicken Wings",
    description: "Crispy wings with your choice of sauce",
    price: 9.99,
    category: "Appetizers",
    image: "🍗"
  },
  {
    id: 5,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, and caesar dressing",
    price: 8.99,
    category: "Salads",
    image: "🥗"
  },
  {
    id: 6,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting",
    price: 6.99,
    category: "Desserts",
    image: "🍰"
  },
  {
    id: 7,
    name: "French Fries",
    description: "Crispy golden fries with sea salt",
    price: 4.99,
    category: "Sides",
    image: "🍟"
  },
  {
    id: 8,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan",
    price: 13.99,
    category: "Pasta",
    image: "🍝"
  }
]

const categories = ["All", "Pizza", "Burgers", "Appetizers", "Salads", "Pasta", "Sides", "Desserts"]

function MenuPage() {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Delicious Food Delivered
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our amazing selection of freshly prepared meals, made with love and delivered right to your door.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#f97316] text-white'
                : 'bg-white text-gray-700 hover:bg-[#ffedd5] border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="card hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{item.image}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#f97316]">
                  ${item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn-primary flex items-center space-x-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default MenuPage 