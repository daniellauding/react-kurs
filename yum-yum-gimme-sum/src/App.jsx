import { Routes, Route } from 'react-router-dom'
import { MenuPage } from '@/features/menu'
import { CartPage } from '@/features/cart'
import { OrderConfirmationPage, ReceiptPage } from '@/features/order'
import InitializationWrapper from '@/components/InitializationWrapper'

function App() {
  return (
    <InitializationWrapper>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderConfirmationPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </InitializationWrapper>
  )
}

export default App
