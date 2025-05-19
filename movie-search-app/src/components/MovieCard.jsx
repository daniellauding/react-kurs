import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p>IMDB ID: {movie.imdbID}</p>
    </div>
  );
}

export default MovieCard;
