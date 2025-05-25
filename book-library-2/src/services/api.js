// API-service för att hantera alla API-anrop
// Centraliserar all kommunikation med externa API:er

const API_BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api';

// Hjälpfunktion för att hantera fetch-anrop
const fetchData = async (url) => {
  try {
    console.log('🌐 Hämtar data från:', url);
    
    const response = await fetch(url);
    
    // Kontrollera om anropet lyckades
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Data hämtad:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Fel vid API-anrop:', error);
    throw error; // Kasta vidare felet så komponenten kan hantera det
  }
};

// Hämta alla böcker
export const getAllBooks = async () => {
  return await fetchData(`${API_BASE_URL}/books`);
};

// Hämta en specifik bok baserat på ID
export const getBookById = async (id) => {
  return await fetchData(`${API_BASE_URL}/books/${id}`);
};

// Exportera även som default
export default {
  getAllBooks,
  getBookById
}; 