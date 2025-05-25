import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById } from '../services/api';
import { setSelectedBook } from '../reducers/bookReducer';

function BookDetail() {
  // useParams hämtar parametrar från URL:en
  const { id } = useParams();
  
  // useNavigate för programmatisk navigation
  const navigate = useNavigate();

  // Hämta dispatch för att kunna prata med Redux
  const dispatch = useDispatch();

  // Hämta den valda boken från Redux
  const selectedBook = useSelector((state) => state.books.selectedBook);

  // State för loading och error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Viktigt! Kolla först om vi redan har rätt bok
    if (selectedBook && selectedBook.id === Number(id)) {
      console.log('📖 Använder befintlig bok från Redux:', selectedBook);
      setLoading(false);
      return;
    }

    async function fetchBook() {
      try {
        setLoading(true);
        setError(null);
        
        const bookData = await getBookById(id);
        console.log('📖 Ny bok hämtad:', bookData);
        
        dispatch(setSelectedBook(bookData));
        
      } catch (err) {
        console.error('❌ Fel vid hämtning av bok:', err);
        setError('Kunde inte hämta boken. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      console.log('📖 Hämtar ny bok med id:', id);
      fetchBook();
    }
  }, [id]); // Ta bort selectedBook från dependency array!

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Hämtar bok...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tillbaka till böcker
          </button>
        </div>
      </div>
    );
  }

  // Om ingen bok hittades
  if (!selectedBook) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Boken hittades inte</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tillbaka till böcker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back button */}
      <div className="absolute top-8 left-8 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition-colors"
          aria-label="Gå tillbaka"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div 
                className="aspect-[3/4] w-full max-w-sm rounded-lg shadow-2xl p-8 flex flex-col justify-between text-white relative overflow-hidden"
                style={{ backgroundColor: selectedBook.color }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <h2 className="text-2xl font-bold leading-tight">
                    {selectedBook.title}
                  </h2>
                  <p className="text-lg opacity-90">
                    {selectedBook.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{selectedBook.title}</h1>
                <p className="text-xl text-gray-300">By {selectedBook.author}</p>
              </div>

              {/* Description */}
              {selectedBook.description && (
                <div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedBook.description}
                  </p>
                </div>
              )}

              {/* Book Info */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {selectedBook.audience && (
                  <div>
                    <span className="text-gray-400 text-sm">Audience:</span>
                    <p className="text-white font-medium">{selectedBook.audience}</p>
                  </div>
                )}
                
                {selectedBook.first_published && (
                  <div>
                    <span className="text-gray-400 text-sm">First published:</span>
                    <p className="text-white font-medium">{selectedBook.first_published}</p>
                  </div>
                )}
                
                {selectedBook.pages && (
                  <div>
                    <span className="text-gray-400 text-sm">Pages:</span>
                    <p className="text-white font-medium">{selectedBook.pages}</p>
                  </div>
                )}
                
                {selectedBook.publisher && (
                  <div>
                    <span className="text-gray-400 text-sm">Publisher:</span>
                    <p className="text-white font-medium">{selectedBook.publisher}</p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Oh, I want to read it!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;