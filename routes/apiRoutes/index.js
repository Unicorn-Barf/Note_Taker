const router = require('express').Router();
const { getAllNotes, createNote, deleteNote } = require('../../controllers/notesController');

// Routes for /api/routes
router.route('/notes')
    .get(getAllNotes)
    .post(createNote);

// Route for deleting a note of specific id
router.route('/notes/:id')
    .delete(deleteNote);

module.exports = router;