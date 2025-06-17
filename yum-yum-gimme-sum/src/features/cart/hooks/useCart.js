import { useSelector } from 'react-redux'

export function useCartItems() {
  return useSelector(state => state.cart.items)
}

export function useCartTotal() {
  return useSelector(state => state.cart.total)
}

export function useCartSummary() {
  const items = useCartItems()
  const total = useCartTotal()
  
  return {
    items,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    isEmpty: items.length === 0
  }
} 