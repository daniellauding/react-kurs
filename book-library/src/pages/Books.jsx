import React, { useState, useEffect } from 'react';
import Book from '../components/Book';
import { getAllBooks } from '../services/api';

function Books() {
  // useState för att hantera komponentens state
  const [books, setBooks] = useState([]); // Array för alla böcker
  const [loading, setLoading] = useState(true); // Boolean för loading-state
  const [error, setError] = useState(null); // String för felmeddelanden

  // useEffect körs när komponenten mountas (första gången den visas)
  useEffect(() => {
    console.log('📚 Books-komponenten har mountats, hämtar böcker...');
    
    // Async funktion för att hämta böcker
    const fetchBooks = async () => {
      try {
        setLoading(true); // Visa loading
        setError(null); // Rensa tidigare fel
        
        // Anropa API:et
        const booksData = await getAllBooks();
        
        console.log('📚 Böcker hämtade:', booksData);
        setBooks(booksData); // Spara böckerna i state
        
      } catch (err) {
        console.error('❌ Fel vid hämtning av böcker:', err);
        setError('Kunde inte hämta böcker. Försök igen senare.');
      } finally {
        setLoading(false); // Dölj loading oavsett resultat
      }
    };

    fetchBooks();
  }, []); // Tom dependency array = körs bara en gång

  // Visa loading-spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Hämtar böcker...</p>
        </div>
      </div>
    );
  }

  // Visa felmeddelande
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            8 Classic Children's Books
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upptäck vårt urval av klassiska barnböcker som har förtrollat generationer av läsare.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {books.map((book) => (
            <Book 
              key={book.id} 
              book={book} 
            />
          ))}
        </div>

        {/* Om inga böcker finns */}
        {books.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Inga böcker hittades.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books; 