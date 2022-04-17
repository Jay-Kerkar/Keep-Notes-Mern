const express = require("express")
const router = express.Router()
const user_details = require("../middleware/user_details")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator')
const { findByIdAndUpdate } = require("../models/Note")

// ROUTE 1: Fetching Notes | Method: GET | Endpoint: /api/notes/fetchnotes
router.get('/fetchnotes', user_details, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Adding Notes | Method: POST | Endpoint: /api/notes/addnotes
router.post('/addnotes', user_details, [body('title', 'Please Enter A Valid Title Of Minimum 4 Characters').isLength({ min: 4 }), body('content', 'Please Enter A Valid Content Of Minimum 4 Characters').isLength({ min: 4 }), body('label', 'Please Enter A Valid Label Of Minimum 4 Characters').isLength({ min: 4 })], async (req, res) => {
    try {
        // Retriving Title, Content And Label From The Body Of Request
        const { title, content, label } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //Creating A New Note According To The Data Provided By The User
        const note = await Note({ title, content, label, user: req.user.id })
        const save_note = await note.save()
        res.json(save_note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Updating Notes | Method: PUT | Endpoint: /api/notes/updatenotes
router.put('/updatenotes/:id', user_details, [body('title', 'Please Enter A Valid Title Of Minimum 4 Characters').isLength({ min: 4 }), body('content', 'Please Enter A Valid Content Of Minimum 4 Characters').isLength({ min: 4 }), body('label', 'Please Enter A Valid Label Of Minimum 4 Characters').isLength({ min: 4 })], async (req, res) => {
    try {
        // Retriving Title, Content And Label From The Body Of Request
        const { title, content, label } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Creating A New Note For Updation According To The Data Provided By The User
        const note = {}
        if (title) { note.title = title }
        if (content) { note.content = content }
        if (label) { note.label = label }

        // Validating The User For Updation Of The Note
        let update_note = await Note.findById(req.params.id)
        if (!update_note) {
            return res.status(404).send("The Note With This ID Was Not Found")
        }
        if (update_note.user.toString() !== req.user.id) {
            return res.status(401).send("Your Access Has Been Denied - Unauthorized Access")
        }

        // Updating The Note According To The Data Provided By The User
        update_note = await Note.findByIdAndUpdate(req.params.id, { $set: note }, { new: true })
        res.json({ update_note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 4: Deleting Notes | Method: DELETE | Endpoint: /api/notes/deletenotes
router.delete('/deletenotes/:id', user_details, async (req, res) => {
    try {
        // Validating The User For Deletion Of The Note
        let delete_note = await Note.findById(req.params.id)
        if (!delete_note) {
            return res.status(404).send("The Note With This ID Was Not Found")
        }
        
        if (delete_note.user.toString() !== req.user.id) {
            return res.status(401).send("Your Access Has Been Denied - Unauthorized Access")
        }

        // Delting The Note As Per The Request Provided My User
        delete_note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The Requested Note Has Been Deleted Successfully", delete_note: delete_note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router