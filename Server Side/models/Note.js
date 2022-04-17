const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        reference: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: "General"
    },
    time_stamp: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("Note", NoteSchema)
module.exports = Note