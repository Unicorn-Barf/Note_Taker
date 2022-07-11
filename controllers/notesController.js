const fs = require('fs');
const path = require('path');
const { v4: uuidV4 } = require('uuid');

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
    newNote.id = uuidV4(),
    console.log(req.body.id);
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    }));
    console.log(typeof notes);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            return res.status(400).json({ err });
        }
        else {
            const response = {
                status: 'success',
                body: newNote,
            };
        
            res.json(response);
        }
    });

}

const deleteNote = (req, res) => {
    // get the note ID from req body
    const { id } = req.params;
    console.log(id);
    // Read the database file and store in notes
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    }));
    // remove note by id from notes array
    notes.forEach((note, index) => {
        if (note.id === id) {
            notes.splice(index, 1);
            return
        }
    });
    
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            return res.status(400).json({ err });
        }
        else {
            const response = {
                status: 'success',
                body: newNote,
            };
        
            res.json(response);
        }
    });
}

module.exports = {
    getAllNotes,
    createNote,
    deleteNote
}