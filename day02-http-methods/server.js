const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

    const users = [
      { id: 1, name: 'Shruti Hadkar', email: 'shruti@example.com' },
      { id: 2, name: 'Rahul Gupta', email: 'rahul@example.com' },
    ];

    app.get('/users', (req, res) => {
    res.status(200).json(users);
  });
  app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log('Received:', newUser);
    res.status(201).json({ 
      message: 'User created!', 
      user: newUser 
    });
  });
  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const deleted = users.splice(index, 1);
    res.status(200).json({ 
      message: 'User deleted!', 
      user: deleted[0] 
    });
  });
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });