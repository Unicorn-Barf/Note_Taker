const fs = require('fs');
const path = require('path');
const { v4: uuidV4 } = require('uuid');

const getAllNotes = (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.json(JSON.parse(data));
    });
}

const createNote = (req, res) => {
    // Get user input from request body
    const newNote = req.body
    // Assign note a unique uuidV4 id value
    newNote.id = uuidV4();

    // Get JSON parsed array of objects from db.json
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    }));

    // Add newNote object to beginning of notes array
    notes.unshift(newNote);
    // Update the db.json with new note array
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

    // Read the database file and store in notes
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        return data;
    }));
    // remove note by id from notes array
    // save specific note for success log
    let deletedNote;
    notes.forEach((note, index) => {
        if (note.id === id) {
            deletedNote = note;
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
                body: deletedNote,
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