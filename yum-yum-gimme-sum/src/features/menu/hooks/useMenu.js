import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function useMenuItems() {
  return useSelector(state => ({
    items: state.menu.items,
    loading: state.menu.loading,
    error: state.menu.error
  }))
}

export function useMenuCategories(menuItems) {
  return useMemo(() => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      return ["All"]
    }
    
    const uniqueCategories = [...new Set(menuItems.map(item => item.category).filter(Boolean))]
    return ["All", ...uniqueCategories]
  }, [menuItems])
}

export function useFilteredMenuItems(menuItems, selectedCategory) {
  return useMemo(() => {
    if (!Array.isArray(menuItems)) {
      return []
    }
    
    return selectedCategory === "All" 
      ? menuItems 
      : menuItems.filter(item => item.category === selectedCategory)
  }, [menuItems, selectedCategory])
} 