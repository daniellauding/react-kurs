import { Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import MainLayout from './layouts/MainLayout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import ReceiptPage from './pages/ReceiptPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderConfirmationPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Route>
    </Routes>
  )
}

export default App 