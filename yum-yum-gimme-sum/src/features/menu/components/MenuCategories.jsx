function MenuCategories({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
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
  )
}

export default MenuCategories 