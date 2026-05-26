const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {

    res.send('hello! my server is working');
});

app.get('/about', (req,res) => {
    res.send('my name is shruti and i am building backend api');
});

app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});
