const express = require('express')
const app = express()
const Note = require('../models/note.model.js');
app.use(express.urlencoded({
  extended: false
}))
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        _id: req.body._id,
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary
    });
    

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a Book."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Book with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }
// Find note and update it with the request body
Note.findByIdAndUpdate(req.params.noteId, {
    _id: req.body._id,
      name: req.body.name,
      img: req.body.img,
      summary: req.body.summary
    }, { new: true })
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Book not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Book not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error updating Book with id " + req.params.noteId
    });
});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.noteId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.noteId
        });
    });
};