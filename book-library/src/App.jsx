import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importera våra sidor
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';

// Importera routes-konfiguration
import { routes } from './routes';

function App() {
  console.log('🚀 App-komponenten startar...');

  return (
    <Router>
      {/* Router wrapprar hela applikationen och ger tillgång till routing */}
      <div className="App">
        <Routes>
          {/* Route för att visa alla böcker - startsidan */}
          <Route 
            path={routes.books} 
            element={<Books />} 
          />
          
          {/* Route för att visa en specifik bok med dynamisk parameter */}
          <Route 
            path={routes.bookDetail} 
            element={<BookDetail />} 
          />
          
          {/* Fallback route - om ingen annan route matchar */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">404 - Sidan hittades inte</h1>
                  <p className="text-gray-600 mb-4">Den sida du letar efter existerar inte.</p>
                  <a 
                    href="/" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Tillbaka till startsidan
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
