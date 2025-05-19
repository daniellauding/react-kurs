import { useState } from 'react'
import './App.css'

import SearchMovies from './components/SearchMovies';
import DisplayMovies from './components/DisplayMovies';

// const products = [
//   {
//     title: 'A Sign of Four',
//     author: 'Av Sir Arthur Conan Doyle',
//     description:
//       'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
//   },
//   {
//     title: 'A Study in Scarlet',
//     author: 'Av Sir Arthur Conan Doyle',
//     description:
//       'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
//   },
//   {
//     title: 'Baskervilles HoundScaelet',
//     author: 'Av Sir Arthur Conan Doyle',
//     description:
//       'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
//   },
//   {
//     title: 'The Adventures of Sherlock Holmes',
//     author: 'Av Sir Arthur Conan Doyle',
//     description:
//       'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
//   },

// ];

function App() {

  const [movies, setMovies] = useState([]);
  
  return (
    <>
      <div className="App">
        <h1>Movie Search App</h1>
        <SearchMovies onSearch={setMovies} />
        <DisplayMovies movies={movies} />
      </div>
    </>
  );
}

export default App
