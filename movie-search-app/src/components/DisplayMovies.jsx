import React from 'react';
import MovieCard from './MovieCard';

function DisplayMovies({ movies }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
      ) : (
        <p>Inga filmer hittades.</p>
      )}
    </div>
  );
}

export default DisplayMovies;
