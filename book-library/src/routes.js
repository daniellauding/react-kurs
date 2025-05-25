// Centraliserad routing-konfiguration
// Detta gör det enkelt att hantera alla routes på ett ställe

export const routes = {
  // Huvudsida med alla böcker
  books: '/',
  
  // Detaljsida för en specifik bok
  // :id är en parameter som kommer från URL:en
  bookDetail: '/bok/:id',
  
  // Hjälpfunktion för att skapa URL till en specifik bok
  getBookDetailPath: (id) => `/bok/${id}`
};

// Exportera även som default för enklare import
export default routes; 