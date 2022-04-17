const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    time_stamp: {
        type: Date,
        default: Date.now
    } 
})

const User = mongoose.model("User",UserSchema)
module.exports = User