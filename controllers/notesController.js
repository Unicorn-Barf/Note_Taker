const fs = require('fs');
const path = require('path');

const getAllNotes = (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    });
    res.json(JSON.parse(notes));
}

const createNote = (req, res) => {
    // Get user input from request body
    const newNote = req.body
    console.log(req.body);
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    }));
    console.log(typeof notes);
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            return res.status(400).json({ err });
        }
        else {
            const response = {
                status: 'success',
                body: newNote,
            };
        
            return res.json(response);
        }
    });
}

const deleteNote = () => {
    
}

module.exports = {
    getAllNotes,
    createNote,
    deleteNote
}