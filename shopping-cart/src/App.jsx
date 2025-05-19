import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Product from './components/Product'

const products = [
  {
    title: 'A Sign of Four',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
  },
  {
    title: 'A Study in Scarlet',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
  },
  {
    title: 'Baskervilles HoundScaelet',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
  },
  {
    title: 'The Adventures of Sherlock Holmes',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
  },

];

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
    <>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Product
            key={index}
            id={index}
            title={product.title}
            author={product.author}
            description={product.description}
            addToCart={() => addToCart({ id: index, ...product })}
          />
        ))}
      </div>
    </>
  );
}

export default App
