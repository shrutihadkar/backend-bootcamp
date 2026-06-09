// Simulated database (array for now)
// Week 3 this becomes real PostgreSQL
let notes = [
    { id: 1, title: 'First note', body: 'This is my first note', createdAt: new Date().toISOString(), updatedAt: null },
    { id: 2, title: 'Meeting notes', body: 'Discuss project timeline', createdAt: new Date().toISOString(), updatedAt: null },
  ];
  let nextId = 3;
  
  const getAllNotes = () => {
    return notes;
  };
  
  const getNoteById = (id) => {
    return notes.find(n => n.id === id);
  };
  
  const createNote = (title, body) => {
    const note = {
      id: nextId++,
      title,
      body: body || null,
      createdAt: new Date().toISOString(),
      updatedAt: null
    };
    notes.push(note);
    return note;
  };
  
  const updateNote = (id, title, body) => {
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    notes[index] = {
      ...notes[index],
      title: title || notes[index].title,
      body: body || notes[index].body,
      updatedAt: new Date().toISOString()
    };
    return notes[index];
  };
  
  const deleteNote = (id) => {
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    return notes.splice(index, 1)[0];
  };
  
  module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
  };