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

const createNote = async (req, res) => {
    // Get user input from request body
    const newNote = req.body
    console.log(req.body);
    const notes = await JSON.parse(fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
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

const deleteNote = () => {
    
}

module.exports = {
    getAllNotes,
    createNote,
    deleteNote
}