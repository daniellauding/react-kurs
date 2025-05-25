function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Om detta projekt</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart 2.0</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Detta är ett React-projekt som demonstrerar en enkel e-handelsapplikation 
          för böcker. Projektet använder moderna React-tekniker som hooks, 
          komponentbaserad arkitektur och React Router för navigation.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Teknologier som används:</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>React 19 med hooks (useState)</li>
          <li>React Router för navigation</li>
          <li>Tailwind CSS för styling</li>
          <li>Vite som build-verktyg</li>
          <li>ESLint för kodkvalitet</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3">Funktioner:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Produktvisning med detaljer</li>
          <li>Kundvagn med add/remove funktionalitet</li>
          <li>Responsiv design</li>
          <li>Navigation mellan olika sidor</li>
        </ul>
      </div>
    </div>
  )
}

export default About 