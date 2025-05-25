import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

// Komponent för att visa en enskild bok i listan
// Tar emot book-objektet som prop
function Book({ book }) {
  // Destructuring för att plocka ut värden från book-objektet
  const { id, title, author, color } = book;

  return (
    <Link 
      to={routes.getBookDetailPath(id)}
      className="block group cursor-pointer transform transition-all duration-200 hover:scale-105"
    >
      <div 
        className="aspect-[3/4] rounded-lg shadow-lg p-6 flex flex-col justify-between text-white relative overflow-hidden group-hover:shadow-xl"
        style={{ backgroundColor: color }}
      >
        {/* Gradient overlay för bättre läsbarhet */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Innehåll */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Titel */}
          <h3 className="text-xl font-bold leading-tight mb-2">
            {title}
          </h3>
          
          {/* Författare */}
          <p className="text-sm opacity-90 mt-auto">
            {author}
          </p>
        </div>
        
        {/* Hover-effekt */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </div>
    </Link>
  );
}

export default Book; 