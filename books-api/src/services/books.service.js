// Simulated database (array for now)
// Week 3 this becomes real PostgreSQL
let books = [
    { id: 1, title: 'harry potter', price: '400', category: 'fiction' },
    { id: 2, title: 'hath yog', price: '200', category: 'non-fiction'},
  ];
  let nextId = 3;
  
  const getAllBooks = () => {
    return books;
  };
  
  const getBooksById = (id) => {
    return books.find(b => b.id === id);
  };
  
  const createBook = (title, price, category) => {
    const book = {
        id: nextId++,
        title,
        price: price || null,
        category: category || null

    };
    books.push(book);
    return book;
  }; 
  const updateBook = (id, title, price, category) => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    books[index] = {
        ...books[index],
        title: title || books[index].title,
        price: price || books[index].price,
        category: category || books[index].category
        
    };
    return books[index];
  };
  module.exports = {
    getAllBooks,
    getBooksById,
    createBook,
    updateBook
  };