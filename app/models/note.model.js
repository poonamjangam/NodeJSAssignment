const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Note', NoteSchema);
