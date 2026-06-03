const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

let notes = [
  { id: 1, title: 'First note', body: 'This is my first note', createdAt: new Date().toISOString() },
  { id: 2, title: 'Meeting notes', body: 'Discuss project timeline', createdAt: new Date().toISOString() },
];
let nextId = 3;
app.get('/notes', (req, res) => {
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  });
  app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(n => n.id === id);
    
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
  });
  app.post('/notes', (req, res) => {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Title and body are required'
      });
    }
    
    const newNote = {
      id: nextId++,
      title,
      body,
      createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    
    res.status(201).json({
      success: true,
      data: newNote
    });
  });
  id: nextId++
  app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex(n => n.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const { title, body } = req.body;
    
    notes[index] = {
      ...notes[index],
      title,
      body,
      updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({
      success: true,
      data: notes[index]
    });
  });
  app.delete('/notes/:id', (req, res) => {
    const index = notes.findIndex(n => n.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const deleted = notes.splice(index, 1);
    
    res.status(200).json({
      success: true,
      data: deleted[0]
    });
  });
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });