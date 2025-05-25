import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    // Kontrollerar om produkten redan finns i kundvagnen
    const alreadyInCart = cartItems.some(item => item.id === product.id);

    if (!alreadyInCart) {
      // Skapar en ny array med den befintliga kundvagnen plus den nya produkten
      setCartItems([...cartItems, product]);
    }
    // Om produkten redan finns i kundvagnen, gör ingenting
  };

  const removeFromCart = productId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header cartItems={cartItems} removeFromCart={removeFromCart} />
        
        {/* Main content with top padding to account for fixed header */}
        <main className="pt-20 pb-8 px-4">
          <div className="container mx-auto">
            <Routes>
              <Route 
                path="/" 
                element={<Home cartItems={cartItems} addToCart={addToCart} />} 
              />
              <Route 
                path="/about" 
                element={<About />} 
              />
              <Route 
                path="/products" 
                element={<Products addToCart={addToCart} />} 
              />
              <Route 
                path="/product/:id" 
                element={<ProductDetail addToCart={addToCart} />} 
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App
