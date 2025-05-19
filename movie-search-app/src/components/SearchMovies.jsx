import React, { useState } from 'react';

function SearchMovies({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=37fe945a&s=${query}`);
    const data = await response.json();
    onSearch(data.Search || []);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Sök efter en film..."
      />
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
}

export default SearchMovies;
