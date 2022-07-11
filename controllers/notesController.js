const fs = require('fs');
const path = require('path');

const getAllNotes = (req, res) => {
    fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.json(JSON.parse(data));
    });
}

const createNote = (req, res) => {
    // Get user input from request body
    const {}
    const notes = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return JSON.parse(data);
    });

}

const deleteNote = () => {
    
}

module.exports = {
    getAllNotes,
    createNote,
    deleteNote
}