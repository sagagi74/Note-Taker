const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET read the db.json file and return  saved notes 
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST new note to save on the request body, add it to the db.json file
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// DELETE  receive a parameter that contains the id of a note to delete
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

module.exports = router;
