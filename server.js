const express = require('express');
const path = require('path');
const app = express();
const { clog } = require('./middleware/clog');

// Setup up routes
const routes = require('./routes');

// Use middleware for static files, and body parser
app.use(express.static('public'));
app.use(express.json());
app.use(express.usrlencoded({ extended: true }));
// Custom middleware to log user requests
// from Berkeley Bootcamp Express activity files
app.use(clog);

// Use routes in the routes folder
app.use(routes);

// Define PORT
const PORT = 3001

// GET route for homepage
app.get(('/'), (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET route for notes page
app.get(('/'), (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET route for wildcard
app.get(('*'), (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => console.log(`Server successfully listening for request on PORT: ${PORT}`));