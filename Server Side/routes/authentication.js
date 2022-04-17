const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs/dist/bcrypt")
const jwt = require('jsonwebtoken')
const user_details = require("../middleware/user_details")

// JWT_SECRET_KEY For Authentication Of A User Visting Again To The Site - This Is A Confidential Key 
const JWT_SECRET_KEY = "SNACKSPACE"

// ROUTE 1: Creating A User | Method: POST | Endpoint: /api/authentication/registration
router.post('/registration', [body('name', 'Please Enter A Valid Name').isLength({ min: 3 }), body('email_id', 'Please Enter A Valid Email Id').isEmail(), body('password', 'Please Enter A Password Having Length Minimum 8 Characters').isLength({ min: 8 })], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email_id: req.body.email_id })
        if (user) {
            return res.status(400).json({ error: "Sorry A User With Same Email Id Already Exists" })
        }

        //Generating Salt And Hashing The Password Recieved By The User
        const salt = await bcrypt.genSalt(10)
        const secure_password = await bcrypt.hash(req.body.password, salt)

        //Creating A New User According To The Data Provided By The User
        user = await User.create({
            name: req.body.name,
            email_id: req.body.email_id,
            password: secure_password,
        })

        //Signing The Json Web Token And Creating Authentication Token
        const data = { user: { id: user.id } }
        const authentication_token = jwt.sign(data, JWT_SECRET_KEY)
        res.json({ authentication_token })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Logging In A User | Method: POST | Endpoint: /api/authentication/login
router.post('/login', [body('email_id', 'Please Enter A Valid Email Id').isEmail(), body('password', 'Please Enter A Valid Password').exists()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Retriving Email Id And Password From The Body Of Request
    const { email_id, password } = req.body

    try {
        //Verfication Of The Retrived Email Id
        let user = await User.findOne({ email_id: email_id })
        if (!user) {
            return res.status(400).json({ error: "Please Try To Login Using Valid Credentials" })
        }

        //Verfication Of The Retrived Password
        const compare_password = await bcrypt.compare(password, user.password)
        if (!compare_password) {
            return res.status(400).json({ error: "Please Try To Login Using Valid Credentials" })
        }

        //Signing The Json Web Token And Creating Authentication Token
        const data = { user: { id: user.id } }
        const authentication_token = jwt.sign(data, JWT_SECRET_KEY)
        res.json({ authentication_token })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Fetch The Details Of The User Who Is Logged In | Method: POST | Endpoint: /api/authentication/userdetails
router.post('/userdetails', user_details, async (req, res) => {
    try {
        const user_id = req.user.id
        const user = await User.findById(user_id).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 4: Updating A User | Method: PUT | Endpoint: /api/authentication/updateusers
router.put('/updateusers/:id', user_details, [body('name', 'Please Enter A Valid Name Of Minimum 4 Characters').isLength({ min: 4 }), body('email_id', 'Please Enter A Valid Email Id Of Minimum 4 Characters').isLength({ min: 4 }), body('password', 'Please Enter A Valid Password Of Minimum 4 Characters').isLength({ min: 4 })], async (req, res) => {
    try {
        // Retriving Title, Content And Label From The Body Of Request
        const { name, email_id, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Creating A New User For Updation According To The Data Provided By The User
        const user = {}
        if (name) { user.name = name }
        if (email_id) { user.email_id = email_id }
        if (password) { user.password = password }

        // Validating The User For Updation Of The User
        let update_user = await User.findById(req.params.id)
        if (!update_user) {
            return res.status(404).send("The User With This ID Was Not Found")
        }

        if (update_user.id.toString() !== req.user.id) {
            return res.status(401).send("Your Access Has Been Denied - Unauthorized Access")
        }

        // Updating The User According To The Data Provided By The User
        update_user = await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
        res.json({ update_user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 5: Deleting A User | Method: DELETE | Endpoint: /api/authentication/deleteusers
router.delete('/deleteusers/:id', user_details, async (req, res) => {
    try {
        // Validating The User For Deletion Of The User
        let delete_user = await User.findById(req.params.id)
        if (!delete_user) {
            return res.status(404).send("The User With This ID Was Not Found")
        }

        if (delete_user.id.toString() !== req.user.id) {
            return res.status(401).send("Your Access Has Been Denied - Unauthorized Access")
        }

        // Deleting The User As Per The Request Provided My User
        delete_user = await User.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The Requested User Has Been Deleted Successfully", delete_user: delete_user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router