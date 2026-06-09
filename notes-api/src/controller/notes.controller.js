const notesService = require('../services/notes.service');

const getAllNotes = (req, res) => {
  const notes = notesService.getAllNotes();
  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
};

const getNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notesService.getNoteById(id);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  res.status(200).json({
    success: true,
    data: note
  });
};

const createNote = (req, res) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Title must be at least 3 characters'
    });
  }
  const note = notesService.createNote(title, body);
  res.status(201).json({
    success: true,
    data: note
  });
};

const updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;
  const note = notesService.updateNote(id, title, body);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  res.status(200).json({
    success: true,
    data: note
  });
};

const deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notesService.deleteNote(id);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  res.status(200).json({
    success: true,
    data: note
  });
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};