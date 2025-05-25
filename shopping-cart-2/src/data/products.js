export const products = [
  {
    id: 0,
    title: 'A Sign of Four',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
    fullDescription: 'En spännande berättelse om Sherlock Holmes och Dr. Watson som löser mysteriet med de fyra tecknen. Denna klassiska deckare tar läsaren med på en resa genom Londons gator och Indiens exotiska landskap.',
    price: '199 kr',
    pages: '156 sidor',
    published: '1890'
  },
  {
    id: 1,
    title: 'A Study in Scarlet',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
    fullDescription: 'Den allra första berättelsen om Sherlock Holmes och Dr. Watson. Här möts de för första gången och löser sitt första fall tillsammans. En klassiker som lagt grunden för alla framtida detektivberättelser.',
    price: '179 kr',
    pages: '123 sidor',
    published: '1887'
  },
  {
    id: 2,
    title: 'Baskervilles HoundScaelet',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
    fullDescription: 'En av de mest kända Sherlock Holmes-berättelserna. Mysteriet med den övernaturliga hunden som hemsöker familjen Baskerville på de engelska hedarna. Spänning och mystik i perfekt kombination.',
    price: '229 kr',
    pages: '189 sidor',
    published: '1902'
  },
  {
    id: 3,
    title: 'The Adventures of Sherlock Holmes',
    author: 'Av Sir Arthur Conan Doyle',
    description:
      'Mauris turpis justo, pharetra nec neque iaculis, viverra ornare dolor. Nunc sagittis nec dui vel ultrices. Cras tempor consequat massa sit amet pulvinar.',
    fullDescription: 'En samling av tolv korta berättelser som visar Sherlock Holmes på toppen av sin karriär. Varje berättelse är ett mästerverk av deduktion och spänning.',
    price: '249 kr',
    pages: '267 sidor',
    published: '1892'
  },
];

// Hjälpfunktion för att hitta en produkt baserat på ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Hjälpfunktion för att få alla produkter
export const getAllProducts = () => {
  return products;
}; 