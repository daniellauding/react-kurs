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

function App() {  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Product
            id={index}
            title={product.title}
            author={product.author}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
}

export default App
